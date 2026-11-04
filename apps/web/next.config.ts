import type { NextConfig } from "next";
import os from "os";

function getLocalNetworkIps(): string[] {
  const interfaces = os.networkInterfaces();
  const ips: string[] = [];

  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name] || []) {
      if (iface.family === "IPv4" && !iface.internal) {
        ips.push(iface.address);
      }
    }
  }
  return ips;
}

const activeIps = getLocalNetworkIps();

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "localhost:3000",
    "127.0.0.1:3000",
    ...activeIps.map((ip) => `${ip}:3000`),
    ...activeIps,
  ],
} as any; 

export default nextConfig;