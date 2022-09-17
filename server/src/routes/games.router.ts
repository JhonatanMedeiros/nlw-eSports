import { Router } from 'express';

import GamesController from '../controllers/games.controller';

const router = Router();

router.get('/', GamesController.getGamesList);
router.get('/:id/ad', GamesController.getAds);
router.post('/:id/ad', GamesController.createAd);

const gamesRouter = Router()
	.use('/games', router)

export default gamesRouter;
