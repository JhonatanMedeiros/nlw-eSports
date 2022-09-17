import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
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
	name: string;
	yearsPlaying: string | number;
	discord: string;
	weekDays: string | number[];
	hourStart: string;
	hourEnd: string;
	useVoiceChannel: boolean;
}

export const CreateAdModal = ({ games }: CreateAdModalProps) => {
	const [weekDays, setWeekDays] = useState<string[]>([]);
	const [useVoiceChannel, setUseVoiceChannel] = useState<boolean>(false);
	const { register, handleSubmit, formState: { errors } } = useForm<Ad>();

	const onSubmit: SubmitHandler<Ad> = async (formData) => {
		console.log(formData);

		const data: Ad = {
			...formData,
			yearsPlaying: Number(formData.yearsPlaying),
			weekDays: weekDays.map(Number),
			useVoiceChannel
		};

		try {
			await api.post(`/games/${data.game}/ad`, data);
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
					onSubmit={handleSubmit(onSubmit)}
				>
					<div className="flex flex-col gap-2">
						<label htmlFor="game" className="font-semibold">Qual o game?</label>
						<select
							id="game"
							className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500"
							defaultValue={''}
							{...register('game', { required: true })}
						>
							<option disabled value={''}>Selecione o game que deseja jogar</option>
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
						{errors.game && <p className="text-red-700 font-light">Game é obrigatório</p>}
					</div>

					<div className="flex flex-col gap-2">
						<label htmlFor="name">Seu nome (ou nickname)</label>
						<Input
							id="name"
							type="text"
							placeholder="Como te chamam dentro do game?"
							{...register('name', { required: true })}
						/>
						{errors.name && <p className="text-red-700 font-light">Nome é obrigatório</p>}
					</div>

					<div className="grid grid-cols-2 gap-6">
						<div className="flex flex-col gap-2">
							<label htmlFor="yearsPlaying">Joga a quantos anos?</label>
							<Input
								id="yearsPlaying"
								type="number"
								placeholder="Tudo bem ser ZERO"
								{...register('yearsPlaying')}
							/>
						</div>
						<div className="flex flex-col gap-2">
							<label htmlFor="discord">Qual o seu Discord?</label>
							<Input
								id="discord"
								type="text"
								placeholder="Usuário#0000"
								{...register('discord')}
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
									type="time"
									placeholder="De"
									{...register('hourStart')}
								></Input>
								<Input
									id="hourEnd"
									type="time"
									placeholder="Até"
									{...register('hourEnd')}
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
