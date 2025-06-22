import { JSX } from "react";
import Image from "next/image";

export default function StatsCommand(): JSX.Element {
  return (
    <div>
      <h2 className="font-bold mb-1 text-lg">🔢 My stats</h2>
      <div className="ml-2">
        <h3 style={{ marginBottom: "0.5em", fontSize: "1.07em" }}>
          📊 GitHub Stats
        </h3>
        <Image
          src="https://github-readme-stats.vercel.app/api?username=tudes00&show_icons=true&theme=dracula&locale=en"
          alt="Tudes GitHub stats"
          width={400}
          height={200}
          style={{ maxWidth: "100%", height: "auto", marginBottom: "0.5em" }}
          unoptimized
        />
        <h3 style={{ marginBottom: "0.5em", fontSize: "1.07em" }}>
          📈 Top Languages
        </h3>
        <Image
          src="https://github-readme-stats.vercel.app/api/top-langs/?username=tudes00&theme=dracula&hide=gherkin,batchfile&layout=compact&locale=en"
          alt="Top Languages"
          width={400}
          height={200}
          style={{ maxWidth: "100%", height: "auto", marginBottom: "0.5em" }}
          unoptimized
        />
        <h3 style={{ marginBottom: "0.5em", fontSize: "1.07em" }}>
          🔥 GitHub Streak
        </h3>
        <Image
          src="https://github-readme-streak-stats-for-me.vercel.app?user=tudes00&theme=dracula&locale=en&date_format=j%20M%5B%20Y%5D&mode=weekly"
          alt="GitHub Streak"
          width={400}
          height={200}
          style={{ maxWidth: "100%", height: "auto", marginBottom: "0.5em" }}
          unoptimized
        />
      </div>
    </div>
  );
}
