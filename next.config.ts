import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  productionBrowserSourceMaps: false,
  async rewrites() {
    // Serve the approved website as complete HTML, before the original Next page.
    // Assets and scripts stay local under /website; no iframe or second app shell.
    return {
      beforeFiles: [
        { source: "/", destination: "/website/index.html" },
        { source: "/privacy", destination: "/website/privacy.html" },
        { source: "/contact", destination: "/website/contact.html" },
        { source: "/account-deletion", destination: "/website/account-deletion.html" },
      ],
    };
  },
};

export default nextConfig;
