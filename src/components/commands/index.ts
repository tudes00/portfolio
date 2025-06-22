import help from "./help";
import CatCommand from "./cat";

export const commandRegistry: Record<string, React.FC<{ args?: string }>> = {
  help,
  cat: CatCommand,
};
