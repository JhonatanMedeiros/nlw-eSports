import http from 'http';

import Logger from '../logger';

const gracefulShutdown = async (server: http.Server) => {
	try {
		await server.close();
		process.exit();
	} catch (err) {
		if (err instanceof Error) {
			Logger.error(err.message);
		} else {
			Logger.error(`Unexpected error\n ${err}`);
		}
		process.exit(1);
	}
};

export default gracefulShutdown;
