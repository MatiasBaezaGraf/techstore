import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	experimental: {
		serverActions: {
			bodySizeLimit: "2mb",
		},
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "gmpesvkainxhnxsoigho.supabase.co",
				port: "",
				pathname: "/**",
			},
		],
	},
};

export default nextConfig;
