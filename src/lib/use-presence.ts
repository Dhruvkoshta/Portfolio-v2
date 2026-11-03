import { useEffect, useState } from "react";

export function usePresence() {
	const [count, setCount] = useState<number>(1);
	const [connected, setConnected] = useState<boolean>(false);

	useEffect(() => {
		if (typeof window === "undefined") return;

		let ws: WebSocket | null = null;
		let reconnectTimer: ReturnType<typeof setTimeout> | null = null;
		let unmounted = false;

		const fetchStats = async () => {
			try {
				const res = await fetch("/api/presence/stats");
				if (res.ok) {
					const data = (await res.json()) as { count?: number };
					if (typeof data.count === "number" && !unmounted) {
						setCount(Math.max(data.count, 1));
					}
				}
			} catch {
				// ignore network errors
			}
		};

		fetchStats();

		const connect = () => {
			if (unmounted) return;

			try {
				const protocol =
					window.location.protocol === "https:" ? "wss:" : "ws:";
				const socketUrl = `${protocol}//${window.location.host}/api/presence/ws`;

				ws = new WebSocket(socketUrl);

				ws.onopen = () => {
					if (!unmounted) setConnected(true);
				};

				ws.onmessage = (event) => {
					try {
						const data = JSON.parse(event.data);
						if (data.type === "presence" && typeof data.count === "number") {
							if (!unmounted) setCount(Math.max(data.count, 1));
						}
					} catch {
						// ignore parse error
					}
				};

				ws.onclose = () => {
					if (!unmounted) {
						setConnected(false);
						reconnectTimer = setTimeout(connect, 5000);
					}
				};

				ws.onerror = () => {
					if (ws) ws.close();
				};
			} catch {
				if (!unmounted) {
					reconnectTimer = setTimeout(connect, 10000);
				}
			}
		};

		connect();

		return () => {
			unmounted = true;
			if (reconnectTimer) clearTimeout(reconnectTimer);
			if (ws) {
				ws.onclose = null;
				ws.onerror = null;
				ws.close();
			}
		};
	}, []);

	return { count, connected };
}
