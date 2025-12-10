import { useEffect } from "react";
import { useLocation } from "react-router";

/**
 * Scrolls the window to the top every time the route changes.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return null;
}