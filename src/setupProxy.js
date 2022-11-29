const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '*',
    createProxyMiddleware({
      target: 'https://reacttask.mkdlabs.com/',
      changeOrigin: true,
    })
  );

  app.use(
    '/photos/?',
    createProxyMiddleware({
      target: 'https://unsplash.com',
      changeOrigin: true,
    })
  );
};
