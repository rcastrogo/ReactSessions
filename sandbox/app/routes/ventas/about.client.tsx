import { Form, useActionData, useNavigation } from "@remix-run/react";
import type { ActionFunctionArgs } from "@remix-run/node"; // Importa los tipos para la funci�n action

// 1. Funci�n `action`
//    Se ejecuta en el servidor cuando se env�a un formulario a esta ruta.
export async function action({ request }: ActionFunctionArgs) {
    // Obt�n los datos del formulario.
    // Remix parsea autom�ticamente los datos del formulario por ti.
    const formData = await request.formData();
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    // Aqu� ir�a tu l�gica de negocio:
    // - Validar los datos.
    // - Guardar en una base de datos.
    // - Enviar un correo electr�nico.
    // - Llamar a una API externa.

    console.log("Datos recibidos en el servidor:");
    console.log("Nombre:", name);
    console.log("Email:", email);
    console.log("Mensaje:", message);

    // Por ahora, simulamos un peque�o retraso
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Puedes devolver cualquier dato. Esto estar� disponible en el cliente a trav�s de `useActionData`.
    // Es com�n devolver un objeto con un mensaje de �xito o errores de validaci�n.
    return { success: true, message: "�Mensaje enviado con �xito!" };
}

// 2. Componente de UI
export default function MarketingAbout() {
    const actionData = useActionData<typeof action>(); // Obtiene los datos devueltos por la `action`
    const navigation = useNavigation(); // Obtiene informaci�n sobre el estado de la navegaci�n/formulario

    const isSubmitting = navigation.state === "submitting";

    return (
        <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8", padding: "20px" }}>
            <h1>Página de Acerca de</h1>
            <p>Contenido sobre la empresa o el equipo de marketing.</p>

            <h2>Contáctanos</h2>

            {/* Muestra un mensaje de �xito si la acci�n lo devuelve */}
            {actionData?.success && (
                <p style={{ color: "green", fontWeight: "bold" }}>
                    {actionData.message}
                </p>
            )}

            {/* 3. El componente <Form> de Remix */}
            <Form method="post"> {/* Importante: method="post" para activar la action */}
                <div>
                    <label htmlFor="name">Nombre:</label>
                    <input type="text" id="name" name="name" required disabled={isSubmitting} />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" required disabled={isSubmitting} />
                </div>
                <div>
                    <label htmlFor="message">Mensaje:</label>
                    <textarea id="message" name="message" rows={5} required disabled={isSubmitting}></textarea>
                </div>
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
                </button>
            </Form>
        </div>
    );
}