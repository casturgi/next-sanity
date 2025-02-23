module.exports = ({ config }) => {
  config.resolve.fallback = {
    ...config.resolve.fallback,
    fs: false,
    tls: false,
    net: false,
    module: false,
    path: false,
  }
  return config
}
