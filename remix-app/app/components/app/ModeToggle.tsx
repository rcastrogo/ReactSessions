import { Moon, Sun } from 'lucide-react';
import { Theme, useTheme } from 'remix-themes';
import { Button } from '../ui/button';


export function ModeToggle() {
  const [theme, setTheme] = useTheme();

  const toggleTheme = () => {
    setTheme((theme === 'light' ? 'dark' : 'light') as Theme);
  };

  return (
    <>
      <Button variant="ghost" size="icon" onClick={toggleTheme} className="hover:cursor-pointer">
        <Sun
          className="text-freground h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90"
          strokeWidth={1.75}
        />
        <Moon
          className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"
          strokeWidth={1.5}
        />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </>
  );
}
