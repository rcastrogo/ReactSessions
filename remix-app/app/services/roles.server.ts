import type { ErrorStack } from "../models/ErrorStack";
import type { Role } from "../models/Role";
import { createApiRequest } from "./utils.api-resquest.server";
import type { WrappedFetchResponse } from "./utils.server";

export async function fetchRoles(): Promise<WrappedFetchResponse<Role[]> | ErrorStack> {
  return createApiRequest<Role[]>()
    .getFrom('roles/all-lite/?minimal=true')
    .useLog('Fetching roles')
    .invoke();
}
