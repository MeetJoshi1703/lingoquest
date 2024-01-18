const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:8000', // Your backend server's URL
      changeOrigin: true,
      secure: false, // Set to true for HTTPS
      onProxyRes: (proxyRes, req, res) => {
        // Add necessary CORS headers if proxy doesn't handle them automatically
        const allowedOrigin = 'http://localhost:3000'; // Your frontend's origin
        proxyRes.headers['access-control-allow-origin'] = allowedOrigin;
        proxyRes.headers['access-control-allow-credentials'] = 'true';
      },
    })
  );
};
