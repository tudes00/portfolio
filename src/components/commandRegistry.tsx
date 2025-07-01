import help from "./commands/help";
import IntroCommand from "./commands/intro";
import AboutCommand from "./commands/about";
import NeoFetchCommand from "./commands/neofetch";
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
    intro: () => <IntroCommand onLoadEnd={onLoadEnd} />,
    neofetch: () => <NeoFetchCommand onLoadEnd={onLoadEnd} />,
    about: () => <AboutCommand onLoadEnd={onLoadEnd} />,
    skills,
    links,
    stats,
    project: (args?: string) => (
      <ProjectCommand args={args} onLoadEnd={onLoadEnd} />
    ),
  };
}
