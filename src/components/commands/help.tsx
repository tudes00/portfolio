import { JSX } from "react";
import { commands } from "../commands";

export default function HelpCommand(): JSX.Element {
  return (
    <div>
      <h2 className="text-1xl font-bold mb-2">Available Commands:</h2>
      {commands.map((line, index) => (
        <div key={index} className="mb-1">
          <p className="">
            {" "}
            - <span className="blue-output">{line.cmd}</span>: {line.desc}
            {line.available == false && (
              <span
                className="inline-block ml-2 mt-[3px] align-middle text-[10px] leading-none px-2.5 py-[2px] rounded-full 
             bg-[#1e1e1e] text-[#f4cfc9] border border-[#be8d84] 
             shadow-[0_0_4px_#be8d84] tracking-wide"
              >
                🚧
              </span>
            )}
          </p>
        </div>
      ))}
    </div>
  );
}
