import { Router } from 'express';

import AdsController from '../controllers/ads.controller';

const router = Router();

router.get('/:id/discord', AdsController.getDiscord);

const gamesRouter = Router()
	.use('/ads', router)

export default gamesRouter;
