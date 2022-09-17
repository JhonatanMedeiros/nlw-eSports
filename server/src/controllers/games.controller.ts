import { Request, Response } from 'express';

import prisma from '../database/prisma';

import { convertHourStringToMinutes } from '../utils/convert-hour-string-to-minutes';
import { convertMinutesToHourString } from '../utils/convert-minutes-to-hour-string';

type GamesRequestParams = {
	id: string;
}

type GamesRequestBody = {
	name: string;
	yearsPlaying: number;
	discord: string;
	weekDays: string[];
	hourStart: string;
	hourEnd: string;
	useVoiceChannel: boolean;
}

type GamesRequestAds = Request<GamesRequestParams, any, GamesRequestBody>

class GamesController {
	static async getGamesList(request: Request, response: Response) {
		const games = await prisma.game.findMany({
			include: {
				_count: {
					select: {
						ads: true,
					},
				}
			},
			orderBy: [
				{
					title: 'asc'
				},
			]
		});
		return response.json(games);
	}

	static async getAds<P extends Request<GamesRequestParams>>(request: P, response: Response) {
		const gameId = request.params.id;

		const ads = await prisma.ad.findMany({
			select: {
				id: true,
				name: true,
				weekDays: true,
				useVoiceChannel: true,
				yearsPlaying: true,
				hourStart: true,
				hourEnd: true,
			},
			where: {
				gameId,
			},
			orderBy: {
				createdAt: 'desc'
			}
		})

		return response.json(ads.map(ad => {
			return {
				...ad,
				weekDays: ad.weekDays.split(','),
				hourStart: convertMinutesToHourString(ad.hourStart),
				hourEnd: convertMinutesToHourString(ad.hourEnd),
			}
		}));
	}

	static async createAd(request: GamesRequestAds, response: Response) {
		const gameId = request.params.id;
		const body = request.body;

		const ad = await prisma.ad.create({
			data: {
				gameId,
				name: body.name,
				yearsPlaying: body.yearsPlaying,
				discord: body.discord,
				weekDays: body.weekDays.join(','),
				hourStart: convertHourStringToMinutes(body.hourStart),
				hourEnd: convertHourStringToMinutes(body.hourEnd),
				useVoiceChannel: body.useVoiceChannel,
			},
		})

		return response.status(201).json(ad);
	}
}

export default GamesController;
