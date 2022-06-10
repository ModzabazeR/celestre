/** @type {import('next').NextConfig} */

const CopyPlugin = require('copy-webpack-plugin');
const withSvgr = require("next-svgr");
const path = require('path');

module.exports = withSvgr({
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
  },
  images: {
    domains: ['i.ytimg.com'],
  },
  i18n: {
    locales: ['en-US', 'th'],
    defaultLocale: 'en-US',
  }
})