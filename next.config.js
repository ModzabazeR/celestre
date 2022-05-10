/** @type {import('next').NextConfig} */

const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  reactStrictMode: true,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.plugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: path.join(__dirname, 'node_modules/libass-wasm/dist/js'),
            to: path.join(__dirname, 'public/subtitle-octopus'),
          }
        ]
      })
    )
    return config;
  }
}