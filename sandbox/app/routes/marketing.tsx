import { Outlet } from "@remix-run/react";

export default function Marketing() {
    return (
        <div>
            <header>
                <h1>Marketing & SEO</h1>
                <p>Este es el encabezado del diseño de marketing.</p>
                <nav>
                    <ul>
                        <li>
                            <a href="/marketing/about">Acerca de</a>
                        </li>
                        <li>
                            <a href="/marketing/contact">Contacto</a>
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