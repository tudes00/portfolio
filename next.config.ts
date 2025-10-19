import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL("https://github.com/user-attachments/assets/**"),
      new URL("https://lh3.googleusercontent.com/**"),
      new URL("https://bp.okman65.xyz/**"),
      new URL("https://cdn.discordapp.com/**"),
      new URL("https://raw.githubusercontent.com/**"),
    ],
  },
  reactStrictMode: true,
};

export default nextConfig;
