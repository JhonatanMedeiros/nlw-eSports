// setup dotenv
import './env';

import http from 'http';

import app from './app';
import * as serverHandlers from './serverHandlers';
import Logger from './logger';

import gracefulShutdown from './utils/graceful-shutdown';

const server = http.createServer(app);

const PORT = app.get('port');

/**
 * Binds and listens for connections on the specified host
 */
server.listen(PORT);

/**
 * Server Events
 */
server.on('error', (error: Error) => serverHandlers.onError(error, PORT));
server.on('listening', () => serverHandlers.onListening(PORT));
server.on('close', () => serverHandlers.onClose());

/**
 * Nodejs Events
 */
process.on('uncaughtException', (error, origin) => {
	Logger.error(`App exiting due to an uncaught exception: ${error}`);
	process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
	Logger.error(`App exiting due to an unhandled promise: ${promise} and reason: ${reason}`);
	// let's throw the error and let the uncaughtException handle below handle it
	throw reason;
});

// quit on ctrl+c when running docker in terminal
process.on('SIGINT', async () => {
	console.info('Got SIGINT (aka ctrl+c in docker). Graceful shutdown', new Date().toISOString());
	await gracefulShutdown(server);
});

// quit properly on docker stop
process.on('SIGTERM', async () => {
	console.log('Got SIGTERM (docker container stop).Graceful shutdown', new Date().toISOString());
	await gracefulShutdown(server);
});
