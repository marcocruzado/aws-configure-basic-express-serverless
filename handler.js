const awsServer = require("aws-serverless-express");
const app = require("./src/index");

require("./src/database");

const server = awsServer.createServer(app);


exports.handler = (event, context) => {
  return awsServer.proxy(server, event, context);
};
