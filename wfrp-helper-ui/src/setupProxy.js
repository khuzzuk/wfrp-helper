const createProxyMiddleware = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
      ['/wfrp'],
      createProxyMiddleware({
        target: 'http://localhost:8080',
        pathRewrite: {
          '^/wfrp': '/',
        },
        changeOrigin: false
      })
  );
};