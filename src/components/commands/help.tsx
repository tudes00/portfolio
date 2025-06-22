import { JSX } from "react";
import { commands } from "../commands";

export default function HelpCommand(): JSX.Element {
  return (
    <div>
        <h2 className="text-1xl font-bold mb-2">Available Commands:</h2>
        {commands.map((line, index) => (
            <div key={index} className="">
                <p className=""> - <span className="blue-output">{line.cmd}</span>: {line.desc}</p>
            </div>
        ))}
    </div>
  );
}

