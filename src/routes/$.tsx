import { createFileRoute } from "@tanstack/react-router";
import { NotFound } from "~/components/site/not-found";

export const Route = createFileRoute("/$")({
	component: NotFound,
});
