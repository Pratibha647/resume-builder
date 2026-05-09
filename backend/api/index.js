// Vercel Serverless Entry Point
// Vercel looks for api/index.js and calls it as a serverless function.
// We simply import the configured Express app and export it.
const app = require("../server");
module.exports = app;
