import { Outlet } from "react-router";
import { useIsMounted } from "../hooks/useIsMounted"
import AppNavbar from "../components/AppNavbar";
import Footer from "../components/Footer";

const Layout = () => {
  const isMounted = useIsMounted();

  if (!isMounted) return null;

  return (
    <>
      <div className="flex flex-col min-h-screen bg-background dark:bg-background">
        <AppNavbar />
        <main className="flex-1 max-w-5xl mx-auto w-full p-4">
          <Outlet />
        </main>
        <Footer/>
      </div>
    </>
  );
};

export default Layout;