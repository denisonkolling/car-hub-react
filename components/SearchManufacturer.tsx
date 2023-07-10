'use client';
import Image from 'next/image';
import { SearchManufacturerProps } from '@/types';
import { Combobox, Transition } from '@headlessui/react';
import { useState, Fragment } from 'react';
import { manufacturers } from '@/constants';

const SearchManufacturer = ({	manufacturer, setManufacturer, }: SearchManufacturerProps) => {

	const [query, setQuery] = useState('');

	const filteredManufacturers =
		query === '' 
      ? manufacturers 
      : manufacturers.filter((item) =>
					item
						.toLowerCase()
						.replace(/\s+/g, '')
						.includes(query.toLowerCase().replace(/\s+/g, ''))
			  );

	return (
		<div className="search-manufacturer">
			<Combobox value={manufacturer} onChange={setManufacturer}>
				<div className="relative w-full">
          {/* Botão para a caixa de combinação. Clique no ícone mostra o menu suspenso completo */}
					<Combobox.Button className="absolute top-[14px]">
						<Image src="/car-logo.svg" width={20} height={20} className="ml-4"alt="car logo"/>
					</Combobox.Button>

					<Combobox.Input className="search-manufacturer__input"
						displayValue={(manufacturer: string) => manufacturer}
						onChange={(event) => setQuery(event.target.value)} //Atualiza a consulta de pesquisa quando a entrada for alterada
						placeholder="Volkswagen..."
					/>

					<Transition
						as={Fragment} //agrupar vários elementos sem introduzir um nó DOM adicional
						leave="transition ease-in duration-100"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
						afterLeave={() => setQuery('')} //Redefin0 a consulta de pesquisa após a conclusão da transição
            >
						<Combobox.Options>
							{filteredManufacturers.length === 0 && query !== '' ? (
								<Combobox.Option
									value={query}
									className="search-manufacturer__option">
									Create "{query}"
								</Combobox.Option>
							) : (
								filteredManufacturers.map((item) => (
									<Combobox.Option
										key={item}
										className={({ active }) => `
                    relative search-manufacturer__option ${
											active ? 'bg-primary-blue text-white' : 'text-gray-900'
										}
                    `}
										value={item}>
										{item}
									</Combobox.Option>
								))
							)}
						</Combobox.Options>
					</Transition>
				</div>
			</Combobox>
		</div>
	);
};

export default SearchManufacturer;
