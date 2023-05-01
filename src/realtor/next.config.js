/** @type {import('next').NextConfig} */

const isGithubActions = process.env.GITHUB_ACTIONS || false

let assetPrefix = ''
let basePath = ''

const nextConfig = {
  experimental: {
    appDir: true,
  },
  output: 'export',
  assetPrefix: assetPrefix,
  basePath: basePath,
}

module.exports = nextConfig
