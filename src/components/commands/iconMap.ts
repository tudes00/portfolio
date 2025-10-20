import {
  SiReact,
  SiTypescript,
  SiNextdotjs,
  SiOpenai,
  SiLinux,
  SiUbuntu,
  SiDebian,
  SiParrotsecurity,
  SiApple,
  SiDocker,
  SiKubernetes,
  SiVmware,
  SiVirtualbox,
  SiPython,
  SiRust,
  SiTensorflow,
  SiVercel,
  SiAmazon,
  SiGooglecloud,
  SiGit,
  SiGithub,
  SiGitlab,
  SiBitbucket,
  SiVim,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiTailwindcss,
  SiExpress,
  SiMongodb,
  SiMysql,
  SiPostgresql,
  SiFirebase,
  SiRedux,
  SiGraphql,
  SiNgrok,
  SiNginx,
  SiCloudflare,
  SiPytorch,
  SiFastapi,
  SiFlask,
  SiDjango,
  SiUnity,
  SiUnrealengine,
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
  FaLaptopCode,
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
import { FiTool } from "react-icons/fi";
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
  MySQL: { icon: SiMysql, color: "#4479A1" },
  PostgreSQL: { icon: SiPostgresql, color: "#4169E1" },
  Firebase: { icon: SiFirebase, color: "#FFCA28" },
  Redux: { icon: SiRedux, color: "#764ABC" },
  GraphQL: { icon: SiGraphql, color: "#E10098" },
  "Open Source": { icon: GoRepo, color: "#f43f5e" },
  Web: { icon: FaGlobe, color: "#3b82f6" },
  Portfolio: { icon: FaFolderOpen, color: "#eab308" },
  Productivity: { icon: MdOutlineWork, color: "#10b981" },

  // --- Operating Systems ---
  Linux: { icon: SiLinux, color: "#FCC624" },
  Ubuntu: { icon: SiUbuntu, color: "#E95420" },
  Debian: { icon: SiDebian, color: "#A81D33" },
  Parrot: { icon: SiParrotsecurity, color: "#00AEEF" },
  macOS: { icon: SiApple, color: "#000000" },

  // --- Virtualization & Cloud ---
  Docker: { icon: SiDocker, color: "#2496ED" },
  Kubernetes: { icon: SiKubernetes, color: "#326CE5" },
  VMware: { icon: SiVmware, color: "#607078" },
  VirtualBox: { icon: SiVirtualbox, color: "#183A61" },
  Amazon: { icon: SiAmazon, color: "#FF9900" },
  "Google Cloud": { icon: SiGooglecloud, color: "#4285F4" },
  Vercel: { icon: SiVercel, color: "#000000" },
  Cloud: { icon: MdCloud, color: "#38BDF8" },
  VM: { icon: FaServer, color: "#4B5563" },
  Network: { icon: FaNetworkWired, color: "#0EA5E9" },

  // --- Cybersecurity & System ---
  Cybersecurity: { icon: GiLockedChest, color: "#ef4444" },
  Pentesting: { icon: FaShieldAlt, color: "#dc2626" },
  Terminal: { icon: FaTerminal, color: "#6b7280" },
  CLI: { icon: FaTerminal, color: "#6b7280" },
  SysAdmin: { icon: FaLaptopCode, color: "#10B981" },

  // --- AI / ML / Data ---
  AI: { icon: SiOpenai, color: "#7c3aed" },
  "Machine Learning": { icon: GiArtificialIntelligence, color: "#8B5CF6" },
  TensorFlow: { icon: SiTensorflow, color: "#FF6F00" },
  PyTorch: { icon: SiPytorch, color: "#EE4C2C" },
  Python: { icon: SiPython, color: "#3776AB" },
  Rust: { icon: SiRust, color: "#000000" },
  Data: { icon: GiDatabase, color: "#0ea5e9" },
  "Data Visualization": { icon: AiOutlineAreaChart, color: "#22d3ee" },

  // --- Dev Tools ---
  DevTool: { icon: FiTool, color: "#4b5563" },
  Git: { icon: SiGit, color: "#F05032" },
  GitHub: { icon: SiGithub, color: "#181717" },
  GitLab: { icon: SiGitlab, color: "#FC6D26" },
  Bitbucket: { icon: SiBitbucket, color: "#0052CC" },
  Vim: { icon: SiVim, color: "#019733" },
  Nginx: { icon: SiNginx, color: "#009639" },
  Cloudflare: { icon: SiCloudflare, color: "#F38020" },
  Ngrok: { icon: SiNgrok, color: "#1F1F1F" },

  // --- Frameworks & APIs ---
  FastAPI: { icon: SiFastapi, color: "#009688" },
  Flask: { icon: SiFlask, color: "#000000" },
  Django: { icon: SiDjango, color: "#092E20" },

  // --- Game / Media / Content ---
  Game: { icon: FaGamepad, color: "#a855f7" },
  Unity: { icon: SiUnity, color: "#000000" },
  Unreal: { icon: SiUnrealengine, color: "#0E1128" },
  YouTube: { icon: FaYoutube, color: "#dc2626" },
  "Discord Bot": { icon: FaDiscord, color: "#5865F2" },
  "Content Generation": { icon: BiText, color: "#facc15" },
  Gamification: { icon: GiAchievement, color: "#f59e0b" },

  // --- Misc ---
  Automation: { icon: FaCogs, color: "#14b8a6" },
  Education: { icon: FaGraduationCap, color: "#6366f1" },
  Personal: { icon: FaUser, color: "#f97316" },
};
