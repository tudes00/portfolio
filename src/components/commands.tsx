type Command = {
  cmd: string;
  desc: string;
}[];

export const commands: Command = [
    {
        cmd: 'help',
        desc: 'List available commands',
    },
    {
        cmd: 'about',
        desc: 'About me',
    },
    {
        cmd: 'contact',
        desc: 'How to contact me',
    },
    {
        cmd: 'clear',
        desc: 'Clear the terminal screen',
    },
    {
        cmd: 'skills',
        desc: 'List my skills',
    },
    {
        cmd: 'projects',
        desc: 'List my projects',
    },
    {
        cmd: 'projects <project_name>',
        desc: 'Get details about a specific project',
    },
    {
        cmd: 'shutdown',
        desc: 'Shut down the pc',
    },
    {
        cmd: 'cat <filename>',
        desc: 'Display the contents of a file',
    },
    {
        cmd: 'ls',
        desc: 'List files in the current directory',
    }
]