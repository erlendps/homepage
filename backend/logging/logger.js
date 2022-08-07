const winston = require("winston");

let path;

if (process.env.NODE_ENV !== "production") {
  path = "/home/erlendps/dev/homepage/logs/";
} else {
  path = "/var/log/pauska.no/";
}

const logger = winston.createLogger({
  level: "info",
  format: winston.format.simple(),
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new winston.transports.File({
      filename: path + "error.log",
      level: "error",
    }),
    new winston.transports.File({
      filename: path + "combined.log",
    }),
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

module.exports = logger;
