import type { ErrorStack } from "../models/ErrorStack";
import type { User } from "../models/User";
import { createApiRequest } from "./utils.api-resquest.server";
import { API_TOKEN, type WrappedFetchResponse } from "./utils.server";


/**
 * Fetches all users from the API.
 *
 * Method: GET
 * URL: `${apiUrl}/users/`
 *
 * @returns A `WrappedFetchResponse<User[]>` on success, or `ErrorStack` on failure.
 */
export async function fetchUsers(): Promise<WrappedFetchResponse<User[]> | ErrorStack> {
  return createApiRequest<User[]>()
    .getFrom('users/')
    .useProperty('.')
    .useLog('Fetching users')
    .useToken(API_TOKEN)
    .invoke();
}

export async function fetchLineManagers(): Promise<WrappedFetchResponse<User[]> | ErrorStack> {
  return createApiRequest<User[]>()
    .getFrom('users/line-managers/')
    .useLog('Fetching line-managers')
    .useToken(API_TOKEN)
    .invoke();
}

/**
 * Fetches a list of distinct project names from the API.
 *
 * This function performs a `GET` request to the endpoint `${baseUrl}/users/projects/`
 * and returns an array of project names as strings.
 *
 * @function fetchProjects
 * @async
 *
 * @returns {Promise<ArrayOfStringResponse | ErrorStack>}
 * A promise that resolves to:
 * - `ArrayOfStringResponse` when the request succeeds.
 * - `ErrorStack` when an error occurs during the request.
 *
 * @example
 * ```ts
 * const result = await fetchProjects();
 * if (result.success) {
 *   console.log(result.data); // ["Project A", "Project B", "Project C"]
 * } else {
 *   console.error(result.error);
 * }
 * ```
 */
export async function fetchProjects(): Promise<WrappedFetchResponse<string[]> | ErrorStack> {
  return createApiRequest<string[]>()
    .getFrom('users/projects/')
    .useLog('Projects')
    .useToken(API_TOKEN)
    .invoke();
}
