
import { useLoaderData, ClientLoaderFunctionArgs } from "@remix-run/react";

type User = {
    id: number;
    nombre: string;
}

export async function clientLoader({ request }: ClientLoaderFunctionArgs) {
  const url = "https://my-json-server.typicode.com/rcastrogo/React2025/usuarios";

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return { data };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { error: "Failed to load data" };
  }
}

export default function Index() {

    const data = useLoaderData<{ data : [] }>();

    return (
        <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
            <h1>Ventas</h1>
            {data.data.map( (i: any) => i.id )}
        </div>
    );
}
