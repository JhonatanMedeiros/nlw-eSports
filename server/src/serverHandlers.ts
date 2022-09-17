import Logger from './logger';
/**
 * @param  {NodeJS.ErrnoException} error
 * @param port
 * @returns throw error
 */
export function onError(error: NodeJS.ErrnoException, port: number | string): void {
  if (error.syscall !== 'listen') {
    throw error;
  }

  switch (error.code) {
    case 'EACCES':
      Logger.error(`NLW eSports :: Port ${port} requires elevated privileges`);
      process.env.NODE_ENV !== 'test' ? process.exit(1) : null;
      break;
    case 'EADDRINUSE':
      Logger.error(`NLW eSports :: Port ${port} is already in use`);
			process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * @export onListening
 */
export function onListening(port: string): void {
  Logger.debug(`NLW eSports is listen on PORT ${port} in mode ${process.env.NODE_ENV}`);
}

export function onClose(): void {
  Logger.debug('NLW eSports On Close');
}
