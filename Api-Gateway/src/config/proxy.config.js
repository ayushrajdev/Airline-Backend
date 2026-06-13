const { createProxyMiddleware } = require('http-proxy-middleware');

const flightsProxy = createProxyMiddleware({
    target: 'http://localhost:3000/',
    changeOrigin: true,
    pathRewrite: { '^/flights-service': '/' },
});
const bookingsProxy = createProxyMiddleware({
    target: 'http://localhost:4000/',
    changeOrigin: true,
    pathRewrite: { '^/bookings-service': '/' },
});

module.exports = {
    bookingsProxy,
    flightsProxy,
};
