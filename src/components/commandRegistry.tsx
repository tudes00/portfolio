import help from "./commands/help";
import IntroCommand from "./commands/intro";
import AboutCommand from "./commands/about";
import NeoFetchCommand from "./commands/neofetch";
import skills from "./commands/skills";
import links from "./commands/links";
import stats from "./commands/stats";
import ProjectCommand from "./commands/project";
import SudoCommand from "./commands/sudo";
import WhatamiCommand from "./commands/whatami";
import ChangelogCommand from "./commands/changelog";
import BlogCommand from "./commands/blog";
import ZerolabCommand from "./commands/zerolab";

import { JSX } from "react";

export function commandRegistry(
  setInputVal: React.Dispatch<React.SetStateAction<string>>,
  onLoadEnd?: () => void,
): Record<string, (args?: string) => JSX.Element | string> {
  return {
    help,
    intro: () => <IntroCommand onLoadEnd={onLoadEnd} />,
    changelog: () => <ChangelogCommand onLoadEnd={onLoadEnd} />,
    neofetch: () => <NeoFetchCommand onLoadEnd={onLoadEnd} />,
    about: () => <AboutCommand onLoadEnd={onLoadEnd} />,
    whatami: () => <WhatamiCommand onLoadEnd={onLoadEnd} />,
    skills,
    links,
    stats,
    project: (args?: string) => (
      <ProjectCommand
        args={args}
        onLoadEnd={onLoadEnd}
        setInputVal={setInputVal}
      />
    ),
    blog: (args?: string) => (
      <BlogCommand
        args={args}
        onLoadEnd={onLoadEnd}
        setInputVal={setInputVal}
      />
    ),
    zerolab: (args?: string) => (
      <ZerolabCommand
        args={args}
        onLoadEnd={onLoadEnd}
        setInputVal={setInputVal}
      />
    ),
    sudo: (args?: string) => <SudoCommand args={args} />,
  };
}
