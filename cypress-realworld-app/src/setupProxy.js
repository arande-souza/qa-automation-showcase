const createProxyMiddleware = require("http-proxy-middleware");
require("dotenv").config();

module.exports = function (app) {
  const backendPort = process.env.VITE_BACKEND_PORT || process.env.BACKEND_PORT || "3001";

  app.use(
    createProxyMiddleware(["/login", "/callback", "/logout", "/checkAuth", "graphql"], {
      target: `http://localhost:${backendPort}`,
      changeOrigin: true,
      logLevel: "debug",
    })
  );
};
