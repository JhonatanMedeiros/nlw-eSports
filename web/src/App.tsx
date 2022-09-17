import { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';

import api from './services/api';

import { CreateAdBanner } from './components/CreateAdBanner';
import { GameBanner } from './components/GameBanner';
import { CreateAdModal } from './components/CreateAdModal';

import logoImg from './assets/logo-nlw-esports.svg';

export interface Game {
	id: string;
	title: string;
	bannerUrl: string;
	_count: {
		ads: number;
	}
}

function App() {
	const [games, setGames] = useState<Game[]>([]);

	useEffect(() => {
		const fetching = async () => {
			const { data } = await api.get('/games')
			setGames(data);
		};
		fetching();
	}, []);

	return (
		<div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
			<img src={logoImg} alt=""/>

			<h1 className="text-6xl text-white font-black mt-20">
				Seu <span className="text-transparent bg-nlw-gradient bg-clip-text">duo</span> está aqui.
			</h1>

			<div className="grid grid-cols-6 gap-6 mt-16">
				{games.map(game => {
					return (
						<GameBanner
							key={game.id}
							title={game.title}
							bannerUrl={game.bannerUrl}
							adsCount={game._count.ads}
						/>
					)
				})}
			</div>

			<Dialog.Root>
				<CreateAdBanner/>
				<CreateAdModal games={games} />
			</Dialog.Root>
		</div>
	)
}

export default App
