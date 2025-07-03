import { SiReact, SiTypescript, SiNextdotjs, SiOpenai } from "react-icons/si";
import {
  FaGlobe,
  FaGamepad,
  FaRobot,
  FaUser,
  FaFolderOpen,
  FaCogs,
  FaTerminal,
  FaYoutube,
  FaDiscord,
  FaGraduationCap,
} from "react-icons/fa";
import { MdOutlineWork, MdExtension } from "react-icons/md";
import { GoRepo } from "react-icons/go";
import { AiOutlineAreaChart } from "react-icons/ai";
import { GiAchievement, GiLockedChest } from "react-icons/gi";
import { FiTool } from "react-icons/fi";
import { BiText } from "react-icons/bi";
import { IconType } from "react-icons";

export const iconMap: Record<string, { icon: IconType; color: string }> = {
  React: {
    icon: SiReact,
    color: "#61DBFB", // official React cyan
  },
  Web: {
    icon: FaGlobe,
    color: "#3b82f6", // blue-500
  },
  TypeScript: {
    icon: SiTypescript,
    color: "#3178C6", // official TS blue
  },
  Productivity: {
    icon: MdOutlineWork,
    color: "#10b981", // emerald-500
  },
  "Open Source": {
    icon: GoRepo,
    color: "#f43f5e", // rose-500
  },
  Game: {
    icon: FaGamepad,
    color: "#a855f7", // purple-500
  },
  "Data Visualization": {
    icon: AiOutlineAreaChart,
    color: "#22d3ee", // cyan-400
  },
  Scraper: {
    icon: FaRobot,
    color: "#9ca3af", // gray-400
  },
  Extension: {
    icon: MdExtension,
    color: "#8b5cf6", // violet-500
  },
  Education: {
    icon: FaGraduationCap,
    color: "#6366f1", // indigo-500
  },
  Gamification: {
    icon: GiAchievement,
    color: "#f59e0b", // amber-500
  },
  Personal: {
    icon: FaUser,
    color: "#f97316", // orange-500
  },
  Portfolio: {
    icon: FaFolderOpen,
    color: "#eab308", // yellow-500
  },
  "Next.js": {
    icon: SiNextdotjs,
    color: "#000000", // black (Next.js style)
  },
  Cybersecurity: {
    icon: GiLockedChest,
    color: "#ef4444", // red-500
  },
  Automation: {
    icon: FaCogs,
    color: "#14b8a6", // teal-500
  },
  CLI: {
    icon: FaTerminal,
    color: "#6b7280", // gray-600
  },
  DevTool: {
    icon: FiTool,
    color: "#4b5563", // gray-700
  },
  AI: {
    icon: SiOpenai,
    color: "#7c3aed", // violet-600 (OpenAI style)
  },
  YouTube: {
    icon: FaYoutube,
    color: "#dc2626", // red-600 (YouTube red)
  },
  "Content Generation": {
    icon: BiText,
    color: "#facc15", // yellow-400
  },
  "Discord Bot": {
    icon: FaDiscord,
    color: "#5865F2", // official Discord purple
  },
};
