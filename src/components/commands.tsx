type Command = {
  cmd: string;
  desc: string;
  available?: boolean;
}[];

export const commands: Command = [
  {
    cmd: "help",
    desc: "List available commands",
  },
  {
    cmd: "Intro",
    desc: "It's clear, right?",
  },
  {
    cmd: "about",
    desc: "About me",
  },
  {
    cmd: "links",
    desc: "List my social media links and contact information",
  },
  {
    cmd: "skills",
    desc: "List my skills",
  },
  {
    cmd: "stats",
    desc: "Show my stats",
  },
  {
    cmd: "project",
    desc: "List my projects",
  },
  {
    cmd: "project <project_name>",
    desc: "Get details about a specific project",
  },
  {
    cmd: "blog",
    desc: "List my blogs",
    available: false,
  },
  {
    cmd: "blog <blog_name>",
    desc: "Get details about a blog",
    available: false,
  },
  {
    cmd: "neofetch",
    desc: "Print info about this device",
  },
  {
    cmd: "clear",
    desc: "Clear the terminal screen",
  },
  {
    cmd: "shutdown",
    desc: "Shut down the pc",
    available: false,
  }
];
