import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import Show from "./Show";
import { useIsMounted } from "../hooks/useIsMounted";
import { Button } from "./ui/button";

export function ThemeToggle() {
  const isMounted = useIsMounted();
  const { theme, setTheme } = useTheme();

  if (!isMounted) return null;

  return (
    <Button
      variant="ghost" size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="p-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 hover:cursor-pointer transition"
      aria-label="Toggle theme"
    >
      <Show when={theme === "light"}>
        <Moon />
      </Show>
      <Show when={theme === "dark"}>
        <Sun />
      </Show>
    </Button>
  );
}