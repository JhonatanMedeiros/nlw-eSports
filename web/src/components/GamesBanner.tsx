import { Game } from '../App';

import { GameBanner } from './GameBanner';

interface GamesBannerProps {
	games: Game[];
}

export const GamesBanner = ({ games }: GamesBannerProps) => {
	return (
		<>
			{games.map(game => {
				return (
					<GameBanner
						key={game.id}
						title={game.title}
						bannerUrl={game.bannerUrl}
						adsCount={game._count.ads}
					/>
				);
			})}
		</>
	);
};
