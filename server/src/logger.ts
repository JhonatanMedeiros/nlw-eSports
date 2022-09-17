import winston from 'winston';

const levels = {
  error: 0,
  http: 1,
  warn: 2,
  debug: 3,
  info: 4,
};

const level = () => {
  return process.env.NODE_ENV === 'development' ? 'info' : 'debug';
};

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
};

winston.addColors(colors);

const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.colorize({ all: true }),
  winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`),
);

const transports = [
  new winston.transports.Console(),
];

// Sample usage:
// Logger.error('This is an error log');
// Logger.warn('This is a warn log');
// Logger.info('This is a info log');
// Logger.http('This is a http log');
// Logger.debug('This is a debug log');

const Logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports,
});

export default Logger;
