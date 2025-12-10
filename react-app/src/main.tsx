import { StrictMode } from "react";
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router";
import { Toaster } from "sonner";
import App from './App.tsx';
import AlertMessageComponent from './components/AlertMessageComponent.tsx';
import ScrollToTop from "./components/ScrollTop.tsx";
import './i18n.tsx';
import './index.css';
import { storage } from "./lib/storageUtil.ts";
import { ThemeProvider } from "./providers/ThemeProvider";

const APP_BASENAME = import.meta.env.VITE_APP_BASE_URL || '/';

const redirect = storage.readValue('redirect', '');
if (redirect) {
  storage.writeValue('redirect', '');
  window.history.replaceState(null, '', redirect);
}

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider>
            <BrowserRouter basename={APP_BASENAME}>
                <ScrollToTop />
                <AlertMessageComponent />
                <Toaster />
                <App/>
            </BrowserRouter>
        </ThemeProvider>
    </StrictMode>
);