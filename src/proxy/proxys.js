module.exports = function devServerProxyConfig() {
  return {
    allowedHosts: 'all',
    server: {
      type: 'http',
    },
    proxy: {
      // proxy all requests starting with /api to jsonplaceholder
      '/api/**': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
        logLevel: 'debug',
        headers: {
          Connection: 'keep-alive',
        },
        pathRewrite: {
          '^/api': '',
        },
      },
    },
    port: 8081,
    open: true, // opens browser window automatically
  };
};
