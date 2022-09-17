import { Request, Response } from 'express';

import prisma from '../database/prisma';

class AdsController {
	static async getDiscord(request: Request<{ id: string }>, response: Response) {
		const adId = request.params.id;

		const ad = await prisma.ad.findUnique({
			select: {
				discord: true,
			},
			where: {
				id: adId,
			}
		});

		if (!ad) {
			return response
				.json({ message: 'Ad not found'})
				.status(404);
		}

		return response
			.json({ discord: ad.discord })
			.status(200);
	}
}

export default AdsController
