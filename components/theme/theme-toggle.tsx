import { useThemeToggle } from "@/components/theme/theme-provider";
import { Moon, Sun } from "lucide-react-native";
import { Button } from "../ui/button";

export function ThemeToggle() {
  const { isDark, toggleTheme } = useThemeToggle();

  return (
    <Button
      variant="outline"
      className="rounded-full w-14 shadow shadow-neutral-800 dark:shadow-neutral-200 flex items-center justify-center"
      size="icon"
      onPress={toggleTheme}
    >
      {isDark ? (
        <Moon className="text-black" size={24} />
      ) : (
        <Sun className="text-white" size={24} />
      )}
    </Button>
  );
}
