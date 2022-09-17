import { FormEvent, useState } from 'react';
import { Check, GameController } from 'phosphor-react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as ToggleGroup from '@radix-ui/react-toggle-group';

import api from '../services/api';

import { Game } from '../App';

import { Input } from './Form/Input';

interface CreateAdModalProps {
	games?: Game[];
}

interface Ad {
	game: string;
	yearsPlaying: string;
}

export const CreateAdModal = ({ games }: CreateAdModalProps) => {
	const [weekDays, setWeekDays] = useState<string[]>([]);
	const [useVoiceChannel, setUseVoiceChannel] = useState<boolean>(false);

	const handleOnSubmit = async (event: FormEvent) => {
		event.preventDefault();

		const formData = new FormData(event.target as HTMLFormElement);
		const data = Object.fromEntries(formData) as unknown as Ad;

		try {
			await api.post(
				`/games/${data.game}/ad`,
				{
				  ...data,
				  yearsPlaying: Number(data.yearsPlaying),
				  weekDays: weekDays.map(Number),
				  useVoiceChannel
				}
			);

			alert('Ad criado com sucesso');
		} catch (error) {
			alert('Erro ao criar anúncio');
		}
	};

	return (
		<Dialog.Portal>
			<Dialog.Overlay className="bg-black/60 inset-0 fixed"/>
			<Dialog.Content
				className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
				<Dialog.Title className="text-3xl font-black">Publique um anúncio</Dialog.Title>

				<form
					className="mt-6 flex flex-col gap-4"
					onSubmit={handleOnSubmit}
				>
					<div className="flex flex-col gap-2">
						<label htmlFor="game" className="font-semibold">Qual o game?</label>
						<select
							id="game"
							name="game"
							className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500"
							defaultValue={'default'}
						>
							<option disabled value={'default'}>Selecione o game que deseja jogar</option>
							{
								games?.map((game) => {
								  return (
										<option
											key={game.id}
											value={game.id}
										>
											{ game.title }
										</option>
								  );
								})
							}
						</select>
					</div>

					<div className="flex flex-col gap-2">
						<label htmlFor="name">Seu nome (ou nickname)</label>
						<Input
							id="name"
							name="name"
							type="text"
							placeholder="Como te chamam dentro do game?"
						/>
					</div>

					<div className="grid grid-cols-2 gap-6">
						<div className="flex flex-col gap-2">
							<label htmlFor="yearsPlaying">Joga a quantos anos?</label>
							<Input
								id="yearsPlaying"
								type="number"
								name="yearsPlaying"
								placeholder="Tudo bem ser ZERO"
							/>
						</div>
						<div className="flex flex-col gap-2">
							<label htmlFor="discord">Qual o seu Discord?</label>
							<Input
								id="discord"
								name="discord"
								type="text"
								placeholder="Usuário#0000"
							/>
						</div>
					</div>

					<div className="flex gap-6">
						<div className="flex flex-col gap-2">
							<label htmlFor="weekDays" className="block">Quando costuma jogar?</label>
							<ToggleGroup.Root
								type="multiple"
								className="grid grid-cols-4 gap-2"
								value={weekDays}
								onValueChange={setWeekDays}
							>
								<ToggleGroup.Item
									value="0"
									className={`w-8 h-8 rounded  ${
										weekDays.includes('0')
											? 'bg-violet-500'
											: 'bg-zinc-900'
									}`}
								>
									D
								</ToggleGroup.Item>
								<ToggleGroup.Item
									value="1"
									className={`w-8 h-8 rounded  ${
										weekDays.includes('1')
											? 'bg-violet-500'
											: 'bg-zinc-900'
									}`}
								>
									S
								</ToggleGroup.Item>
								<ToggleGroup.Item
									value="2"
									className={`w-8 h-8 rounded  ${
										weekDays.includes('2')
											? 'bg-violet-500'
											: 'bg-zinc-900'
									}`}
								>
									T
								</ToggleGroup.Item>
								<ToggleGroup.Item
									value="3"
									className={`w-8 h-8 rounded  ${
										weekDays.includes('3')
											? 'bg-violet-500'
											: 'bg-zinc-900'
									}`}
								>
									Q
								</ToggleGroup.Item>
								<ToggleGroup.Item
									value="4"
									className={`w-8 h-8 rounded  ${
										weekDays.includes('4')
											? 'bg-violet-500'
											: 'bg-zinc-900'
									}`}
								>
									Q
								</ToggleGroup.Item>
								<ToggleGroup.Item
									value="5"
									className={`w-8 h-8 rounded  ${
										weekDays.includes('5')
											? 'bg-violet-500'
											: 'bg-zinc-900'
									}`}
								>
									S
								</ToggleGroup.Item>
								<ToggleGroup.Item
									value="6"
									className={`w-8 h-8 rounded   ${
										weekDays.includes('6')
											? 'bg-violet-500'
											: 'bg-zinc-900'
									}`}
								>
									S
								</ToggleGroup.Item>
							</ToggleGroup.Root>
						</div>
						<div className="flex flex-col gap-2 flex-1">
							<label htmlFor="hourStart" className="block">Qual horário do dia?</label>
							<div className="grid grid-cols-2 gap-2">
								<Input
									id="hourStart"
									name="hourStart"
									type="time"
									placeholder="De"
								></Input>
								<Input
									id="hourEnd"
									name="hourEnd"
									type="time"
									placeholder="Até"
								></Input>
							</div>
						</div>
					</div>

					<div className="mt-2 flex items-center gap-2 text-sm">
						<Checkbox.Root
							className="w-6 h-6 p-1 rounded bg-zinc-900"
							onCheckedChange={(checked) => {
							  setUseVoiceChannel(!!checked);
							}}
						>
							<Checkbox.CheckboxIndicator>
								<Check className="w-4 h-4 text-emerald-400" />
							</Checkbox.CheckboxIndicator>
						</Checkbox.Root>
						Costumo me conectar ao chat de voz
					</div>

					<footer className="mt-4 flex justify-end gap-4">
						<Dialog.Close
							type="button"
							className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600"
						>
							Cancelar
						</Dialog.Close>
						<button
							type="submit"
							className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
						>
							<GameController className="w-6 h-6"/>
							Encontrar duo
						</button>
					</footer>
				</form>
			</Dialog.Content>
		</Dialog.Portal>
	);
};
