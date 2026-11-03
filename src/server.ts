import {
	createStartHandler,
	defaultStreamHandler,
	createServerEntry,
} from "@tanstack/react-start/server";
import { DurableObject } from "cloudflare:workers";

export class PresenceRoom extends DurableObject {
	async fetch(request: Request): Promise<Response> {
		const url = new URL(request.url);

		if (url.pathname.endsWith("/ws")) {
			const upgradeHeader = request.headers.get("Upgrade");
			if (!upgradeHeader || upgradeHeader.toLowerCase() !== "websocket") {
				return new Response("Expected Upgrade: websocket", { status: 426 });
			}

			const pair = new WebSocketPair();
			const [client, server] = [pair[0], pair[1]];

			this.ctx.acceptWebSocket(server);
			this.broadcastCount();

			return new Response(null, { status: 101, webSocket: client });
		}

		if (url.pathname.endsWith("/stats")) {
			const sockets = this.ctx.getWebSockets();
			return Response.json({ count: sockets.length });
		}

		return new Response("Not found", { status: 404 });
	}

	async webSocketMessage(ws: WebSocket, message: string | ArrayBuffer) {
		try {
			const text =
				typeof message === "string"
					? message
					: new TextDecoder().decode(message);
			const data = JSON.parse(text);

			if (data.type === "ping") {
				ws.send(
					JSON.stringify({
						type: "pong",
						count: this.ctx.getWebSockets().length,
					}),
				);
			}
		} catch {
			// ignore malformed messages
		}
	}

	async webSocketClose(ws: WebSocket, code: number, reason: string) {
		ws.close(code, reason);
		this.broadcastCount();
	}

	async webSocketError() {
		this.broadcastCount();
	}

	private broadcastCount() {
		const sockets = this.ctx.getWebSockets();
		const payload = JSON.stringify({
			type: "presence",
			count: sockets.length,
		});

		for (const socket of sockets) {
			try {
				socket.send(payload);
			} catch {
				// connection might already be closed
			}
		}
	}
}

const startFetch = createStartHandler(defaultStreamHandler);

export default createServerEntry({
	fetch: async (request: Request) => {
		const url = new URL(request.url);

		if (url.pathname.startsWith("/api/presence")) {
			try {
				const cloudflare = await import("cloudflare:workers");
				const env = cloudflare.env as Env;
				if (env?.PRESENCE_ROOM) {
					const id = env.PRESENCE_ROOM.idFromName("global");
					const stub = env.PRESENCE_ROOM.get(id);
					return stub.fetch(request);
				}
			} catch (err) {
				console.error("[Presence] DO error:", err);
			}

			// Fallback if DO is unavailable
			return Response.json({ count: 1, fallback: true });
		}

		return startFetch(request);
	},
});
