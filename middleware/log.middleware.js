const { logger } = require("../logs/index.js");
async function wireResLogger(ctx, next) {
  await next();
  console.log(`${ctx.method} ${ctx.url}`);
  logger.resLogger(ctx);
}

module.exports = {
  wireResLogger,
};
