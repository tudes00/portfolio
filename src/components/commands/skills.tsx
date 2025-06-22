import { JSX } from "react";
import Image from "next/image";

export default function AboutCommand(): JSX.Element {
  return (
    <div className="">
      <a href="https://skillicons.dev">
        <Image
          src="https://skillicons.dev/icons?i=js,html,css,discordjs,vscode,react,kali,ts,linux,github,bash,python"
          alt="Skill icons: JavaScript, HTML, CSS, Discord.js, VSCode, React, Kali, TypeScript, Linux, GitHub, Bash, Python"
          width={400}
          height={50}
          priority
          unoptimized
        />
      </a>
    </div>
  );
}
