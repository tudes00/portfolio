import {
  SiReact,
  SiTypescript,
  SiNextdotjs,
  SiOpenai,
  SiLinux,
  SiParrotsecurity,
  SiVmware,
  SiVirtualbox,
  SiPython,
  SiVercel,
  SiAmazon,
  SiGit,
  SiGithub,
  SiVim,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiTailwindcss,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiNginx,
} from "react-icons/si";
import {
  FaGlobe,
  FaGamepad,
  FaUser,
  FaFolderOpen,
  FaCogs,
  FaTerminal,
  FaYoutube,
  FaDiscord,
  FaGraduationCap,
  FaServer,
  FaNetworkWired,
  FaShieldAlt,
} from "react-icons/fa";
import { MdOutlineWork, MdCloud } from "react-icons/md";
import { GoRepo } from "react-icons/go";
import { AiOutlineAreaChart } from "react-icons/ai";
import {
  GiAchievement,
  GiLockedChest,
  GiArtificialIntelligence,
  GiDatabase,
} from "react-icons/gi";
import { BiText } from "react-icons/bi";
import { IconType } from "react-icons";

export const iconMap: Record<string, { icon: IconType; color: string }> = {
  // --- Core tech ---
  React: { icon: SiReact, color: "#61DBFB" },
  TypeScript: { icon: SiTypescript, color: "#3178C6" },
  "Next.js": { icon: SiNextdotjs, color: "#000000" },
  JavaScript: { icon: SiJavascript, color: "#F7DF1E" },
  HTML: { icon: SiHtml5, color: "#E34F26" },
  CSS: { icon: SiCss3, color: "#1572B6" },
  TailwindCSS: { icon: SiTailwindcss, color: "#06B6D4" },
  Express: { icon: SiExpress, color: "#000000" },
  MongoDB: { icon: SiMongodb, color: "#47A248" },
  PostgreSQL: { icon: SiPostgresql, color: "#4169E1" },
  "Open Source": { icon: GoRepo, color: "#f43f5e" },
  Web: { icon: FaGlobe, color: "#3b82f6" },
  Portfolio: { icon: FaFolderOpen, color: "#eab308" },
  Productivity: { icon: MdOutlineWork, color: "#10b981" },

  // --- Operating Systems ---
  Linux: { icon: SiLinux, color: "#FCC624" },
  Parrot: { icon: SiParrotsecurity, color: "#00AEEF" },

  VMware: { icon: SiVmware, color: "#607078" },
  VirtualBox: { icon: SiVirtualbox, color: "#183A61" },
  Amazon: { icon: SiAmazon, color: "#FF9900" },
  Vercel: { icon: SiVercel, color: "#000000" },
  Cloud: { icon: MdCloud, color: "#38BDF8" },
  VM: { icon: FaServer, color: "#4B5563" },
  Network: { icon: FaNetworkWired, color: "#0EA5E9" },

  // --- Cybersecurity & System ---
  Cybersecurity: { icon: GiLockedChest, color: "#ef4444" },
  Pentesting: { icon: FaShieldAlt, color: "#dc2626" },
  Terminal: { icon: FaTerminal, color: "#6b7280" },
  CLI: { icon: FaTerminal, color: "#6b7280" },

  // --- AI / ML / Data ---
  AI: { icon: SiOpenai, color: "#7c3aed" },
  "Machine Learning": { icon: GiArtificialIntelligence, color: "#8B5CF6" },
  Python: { icon: SiPython, color: "#3776AB" },
  Data: { icon: GiDatabase, color: "#0ea5e9" },
  "Data Visualization": { icon: AiOutlineAreaChart, color: "#22d3ee" },

  Git: { icon: SiGit, color: "#F05032" },
  GitHub: { icon: SiGithub, color: "#181717" },
  Vim: { icon: SiVim, color: "#019733" },
  Nginx: { icon: SiNginx, color: "#009639" },

  // --- Game / Media / Content ---
  Game: { icon: FaGamepad, color: "#a855f7" },
  YouTube: { icon: FaYoutube, color: "#dc2626" },
  "Discord Bot": { icon: FaDiscord, color: "#5865F2" },
  "Content Generation": { icon: BiText, color: "#facc15" },
  Gamification: { icon: GiAchievement, color: "#f59e0b" },

  // --- Misc ---
  Automation: { icon: FaCogs, color: "#14b8a6" },
  Education: { icon: FaGraduationCap, color: "#6366f1" },
  Personal: { icon: FaUser, color: "#f97316" },
};
