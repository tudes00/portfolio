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
    available: false,
  },
  {
    cmd: "shutdown",
    desc: "Shut down the pc",
    available: false,
  },
  {
    cmd: "cat <filename>",
    desc: "Display the contents of a file",
    available: false,
  },
  {
    cmd: "ls",
    desc: "List files in the current directory",
    available: false,
  },
  {
    cmd: "clear",
    desc: "Clear the terminal screen",
  },
];
