import { Outlet } from "@remix-run/react";

export default function Ventas() {
    return (
        <div>
            <header>
                <h1>VENTAS</h1>
                <p>Este es el encabezado del diseño de Ventas.</p>
                <nav>
                    <ul>
                        <li>
                            <a href="/ventas/about">Acerca de</a>
                        </li>
                        <li>
                            <a href="/ventas/contact">Contacto</a>
                        </li>
                    </ul>
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
            <footer>
                <p>Copyright © 2025. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
}