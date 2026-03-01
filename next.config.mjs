/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Ye line static files generate karegi
  images: {
    unoptimized: true, // Static export ke liye zaruri hai
  },
};

export default nextConfig;
