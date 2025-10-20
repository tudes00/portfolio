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
    cmd: "intro",
    desc: "It's clear, right?",
  },
  {
    cmd: "changelog",
    desc: "List changes and updates",
  },
  {
    cmd: "about",
    desc: "About me",
  },
  {
    cmd: "whatami",
    desc: "What I am working on?",
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
    desc: "List my blog",
  },
  {
    cmd: "blog <blog_name>",
    desc: "Show a specific blog",
  },
  {
    cmd: "zerolab",
    desc: "List my tutuorials from Zerolab repo",
  },
  {
    cmd: "zerolab <file_name>",
    desc: "Show a specific tutorial from Zerolab repo",
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
    cmd: "sudo",
    desc: "Use it at your own risk...",
  },
];
