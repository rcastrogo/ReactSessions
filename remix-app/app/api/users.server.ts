
import type { ActionFunctionArgs } from "react-router";
//import { fetchLineManagers, fetchProjects, fetchUsers } from "~/services/users.server";
//import { fetchRoles } from "~/services/roles.server";
import { getSafeFormData } from "../lib/utils";
import { fetchLineManagers, fetchProjects, fetchRoles, fetchUsers } from "../mocks/mockDataLoader";


export type BaseActionData = {
  intent: string;
  status: string;
  message?: string;
} & Record<string, any>;

export function ok<T extends BaseActionData>(data: T): BaseActionData {
  return { ...data };
}

export function fail(intent: string, message: string): BaseActionData {
  return {
    intent,
    status: "error",
    message,
  };
}

export async function action({ request }: ActionFunctionArgs): Promise<BaseActionData> {
  //export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  let intent = formData.get("intent");

  if (!intent) {
    const json = await request.json().catch(() => ({}));
    intent = json.intent;
  }

  switch (intent) {
    case "init": {
      const [projects, roles, lineManagers] = await Promise.all([
        fetchProjects(),
        fetchRoles(),
        fetchLineManagers(),
      ]);

      if ("error" in projects) return { intent, status: "error" as const, message: projects.error };
      if ("error" in roles) return { intent, status: "error" as const, message: roles.error };
      if ("error" in lineManagers) return { intent, status: "error" as const, message: lineManagers.error };

      return {
        intent,
        status: "ok" as const,
        projects: ('data' in projects) ? projects.data : projects ?? [],
        roles: ('data' in roles) ? roles.data : roles ?? [],
        lineManagers: ('data' in lineManagers) ? lineManagers.data : lineManagers ?? [],
      };
    }

    case "search": {
      const q = (formData.get("q") as string)?.toLowerCase();
      if (!q) return { intent, status: "results" as const, users: [] };

      const users = await fetchUsers();
      if ("error" in users) return { intent, status: "error" as const, message: users.error };

      return {
        intent,
        status: "results" as const,
        users: users.data.filter((u) =>
          u.full_name?.toLowerCase().includes(q)
        ),
      };
    }

    case "create": {
      const data = getSafeFormData(formData);
      const full_name = data.full_name;
      const email = data.email;
      const user = { id: 5555, full_name: full_name, email };
      return { intent, status: "created" as const, user };
    }

    case "update": {
      const data = getSafeFormData(formData);
      const id = ~~data.id;
      const full_name = data.full_name;
      const email = data.email;
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return { intent, status: "updated" as const, user: { id, full_name, email } };
    }

    case "delete": {
      const data = getSafeFormData(formData);
      const id = ~~data.id;
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return { intent, status: "deleted" as const, id };
    }

    default:
      return fail('unknown', 'Unknown intent');
  }
}
