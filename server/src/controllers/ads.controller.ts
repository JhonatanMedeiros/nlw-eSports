import { Request, Response } from 'express';

import prisma from '../database/prisma';

class AdsController {
	static async getDiscord(request: Request<{ id: string }>, response: Response) {
		const adId = request.params.id;

		const ad = await prisma.ad.findUniqueOrThrow({
			select: {
				discord: true,
			},
			where: {
				id: adId,
			}
		});

		return response.json({
			discord: ad.discord,
		})
	}
}

export default AdsController
