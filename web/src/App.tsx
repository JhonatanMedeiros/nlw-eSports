import { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';

import api from './services/api';

import { GamesBanner } from './components/GamesBanner';
import { CreateAdBanner } from './components/CreateAdBanner';
import { CreateAdModal } from './components/CreateAdModal';

import logoImg from './assets/logo-nlw-esports.svg';

export interface Game {
	id: string;
	title: string;
	bannerUrl: string;
	_count: {
		ads: number;
	};
}

function App () {
	const [dialogOpen, setDialogOpen] = useState(false);
	const [games, setGames] = useState<Game[]>([]);

	useEffect(() => {
		const fetching = async () => {
			const { data } = await api.get('/games');
			setGames(data);
		};
		fetching();
	}, []);

	return (
		<div className="container mx-auto flex flex-col items-center p-5">
			<img src={logoImg} alt=""/>

			<h1 className="text-4xl md:text-6xl text-white font-black mt-20">
				Seu <span className="text-transparent bg-nlw-gradient bg-clip-text">duo</span> está aqui.
			</h1>

			<div className="grid grid-cols-1 sm:grid-cols-6 gap-6 mt-16 w-full sm:w-auto">
				<GamesBanner games={games} />
			</div>

			<Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
				<CreateAdBanner/>
				<CreateAdModal
					games={games}
					onCloseDialog={() => setDialogOpen(false)}
				/>
			</Dialog.Root>
		</div>
	);
}

export default App;
