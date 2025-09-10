
import { useLoaderData } from "@remix-run/react";

type User = {
    id: number;
    nombre: string;
}

export function loader() {
    return { id: 5, nombre: 'rafa' };
}

export default function Index() {

    const data = useLoaderData<User>();

    return (
        <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
            <h1>Posts</h1>
            {data.id} {data.nombre}
        </div>
    );
}
