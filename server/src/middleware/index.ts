import express from 'express';
import rateLimit from 'express-rate-limit';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import cors from 'cors';

import morganMiddleware from './morgan-middleware';

const limiter = rateLimit({
	windowMs: 60 * 1000, // 1 minute
	max: 200, // limit each IP to 200 requests per windowMs
	message: 'Too many requests', // message to send
});

export function configure(app: express.Application): void {

	// providing a Connect/Express middleware that can be used to enable CORS with various options
	app.use(cors());

	// apply rate limit to all requests
	app.use(limiter);

	// express middleware
	app.use(
		express.urlencoded({
			extended: false,
		}),
	);

	app.use(express.text());

	app.use(express.json());

	// parse Cookie header and populate req.cookies with an object keyed by the cookie names.
	app.use(cookieParser());

	// returns the compression middleware
	app.use(compression());

	// helps you secure your Express apps by setting various HTTP headers
	app.use(helmet());

	// setup the logger
	app.use(morganMiddleware);
}
