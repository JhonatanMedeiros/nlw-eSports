import express from 'express';

import gamesRouter from './games.router';
import adsRouter from './ads.router';

export function init(app: express.Application): void {
	const router = express.Router();

	app.get('/', (req, res) => res.json({ msg: 'Hello! I am NLW eSports' }));
	app.get('/ping', (req, res) => res.json({ msg: 'pong!' }));

	app.use(router);
	app.use(gamesRouter);
	app.use(adsRouter);
}
