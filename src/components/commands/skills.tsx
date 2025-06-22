import Image from "next/image";
import { JSX } from "react";

export default function AboutCommand(): JSX.Element {
    return (
      <div>
        <p style={{ marginBottom: "0.5em", fontSize: "1.07em" }}>
            <strong>Here are some of the technologies and tools I work with:</strong>
          </p>
            <Image
              src="https://skillicons.dev/icons?i=js,html,css,discordjs,vscode,react,kali,ts,linux,github,python"
              alt="skill icons"
              width={11*50}
              height={50}
              unoptimized
            />
        <p style={{ marginBottom: "0.5em", marginTop: "1.5em", fontSize: "1.07em" }}>
            <strong>Currently learning:</strong>
          </p>
            <Image
              src="https://skillicons.dev/icons?i=c,cpp,arch,git,clion,figma,nodejs,linux,bash"
              alt="Currently learning skill icons"
              width={9*50}
              height={50}
              unoptimized
            />
        <p style={{ marginBottom: "0.5em", marginTop: "1.5em", fontSize: "1.07em" }}>
            <strong>Want to learn:</strong>  
        </p>
            <Image
              src="https://skillicons.dev/icons?i=docker,vim"
              alt="Want to learn skill icons"
              width={2*50}
              height={50}
              unoptimized
            />
      </div>
    );
}

