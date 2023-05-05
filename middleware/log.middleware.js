const { logger } = require("../logs/index.js");
async function wireResLogger(ctx, next) {
  const start = new Date();
  await next();
  const end = new Date();
  logger.resLogger(ctx, end - start);
}

module.exports = {
  wireResLogger,
};
