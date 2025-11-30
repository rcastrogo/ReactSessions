import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { action as handleAction } from "../api/users.server";

export const action: ActionFunction = async (args) => {
  const result = await handleAction(args);
  return json(result); // 👈 Convertimos a JSON de respuesta HTTP
};

// Si quieres permitir GET (p.e. para pruebas)
export const loader = () => {
  return json({ message: "Use POST with intent" });
};
