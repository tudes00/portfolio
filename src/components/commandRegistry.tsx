import help from "./commands/help";
import CatCommand from "./commands/cat";
import AboutCommand from "./commands/about";
import skills from "./commands/skills";
import links from "./commands/links";
import stats from "./commands/stats";
import ProjectCommand from "./commands/project";

import { JSX } from "react";

export function commandRegistry(
  onLoadEnd?: () => void,
): Record<string, (args?: string) => JSX.Element | string> {
  return {
    help,
    cat: (args?: string) => <CatCommand args={args} onLoadEnd={onLoadEnd} />,
    about: () => <AboutCommand onLoadEnd={onLoadEnd} />,
    skills,
    links,
    stats,
    project: (args?: string) => <ProjectCommand args={args} onLoadEnd={onLoadEnd} />,
  };
}
