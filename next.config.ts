import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    allowedDevOrigins: ["172.16.20.167"],
    serverExternalPackages: ['@neondatabase/serverless', 'ws', 'bcryptjs'],
    experimental: {
        serverActions: {
            allowedOrigins: ["localhost:3000", "172.16.20.167:3000"],
        },
    },
};

export default nextConfig;
