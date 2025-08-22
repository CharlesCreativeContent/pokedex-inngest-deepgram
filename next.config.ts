import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {}
  },
  images: {
    domains: ["shawncharles.com"], // allow https://shawncharles.com/*
  },
};
