import { useEffect, useState } from "react";
import { useFetcher } from "react-router";

/**
 * Utility to create a FormData object with the given intent.
 */
function createFormData(intent: string){
  const form = new FormData();
  form.append("intent", intent);
  return form;
}

/**
 * React hook to handle SPA data fetching using useFetcher.
 * 
 * @template T - Expected data shape returned from the API.
 * @param {string} apiPath - The endpoint to post requests to.
 */
export function useSPAData<T extends object>(apiPath: string) {
  const fetcher = useFetcher();
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    fetcher.submit(createFormData("init"), { method: "post", action: apiPath });
  }, [apiPath]);

  useEffect(() => {
    const res = fetcher.data as {status: string, intent: string };
    if (!res || !res.intent) return;
    switch (res.intent) {
      case "init":
      case "refresh":
      case "search":
      case "create":
      case "update":
      case "delete":
        setData(res as T);
        break;
      default:
        console.warn(`Unhandled intent: ${res.intent}`);
    }
  }, [fetcher.data]);

  return {
    data,
    fetcher,
    isLoading: fetcher.state !== "idle",
  };
}

/**
 * Helper to submit an intent with a payload using useFetcher.
 * 
 * @param fetcher - The fetcher instance from useFetcher.
 * @param apiPath - The target API path.
 * @param intent - Intent string (e.g., "create", "update").
 * @param payload - Payload object to send with the form.
 */
export function submitIntent(
  fetcher: ReturnType<typeof useFetcher>,
  apiPath: string,
  intent: string,
  payload: Record<string, string | Blob | number> = {}
) {
  const form = createFormData(intent);
  Object.entries(payload).forEach(([k, v]) => form.append(k, String(v ?? "")) );
  fetcher.submit(form, { method: "post", action: apiPath });
}
