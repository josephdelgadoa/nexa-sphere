import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',
};

export default withNextIntl(nextConfig);
// Force rebuild Sun Dec  7 19:50:24 PST 2025
