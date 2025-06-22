import help from "./commands/help";
import CatCommand from "./commands/cat";
import AboutCommand from "./commands/about";
import skills from "./commands/skills";

import { JSX } from "react";

export function commandRegistry(
  onLoadEnd?: () => void,
): Record<string, (args?: string) => JSX.Element | string> {
  return {
    help,
    cat: (args?: string) => <CatCommand args={args} onLoadEnd={onLoadEnd} />,
    about: () => <AboutCommand onLoadEnd={onLoadEnd} />,
    skills,
  };
}
