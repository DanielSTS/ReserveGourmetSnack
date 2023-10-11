'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useOwnerInfoContext } from '@/contexts/OwnerInfoContext';

export default function ProfileOwner() {
  const { owner, establishment } = useOwnerInfoContext();
  const [ownerName, setOwnerName] = useState(owner.name ?? '');
  const [password, setPassword] = useState('');
  const [establishmentName, setEstablishmentName] = useState(establishment?.name ?? '');
  const [phone, setPhone] = useState(establishment?.phone ?? '');
  const [category, setCategory] = useState(establishment?.category || '');
  const [maxCapacity, setMaxCapacity] = useState(establishment?.maxCapacity || 0);
  const [address, setAddress] = useState(establishment?.address || '');
  const [openingOpeningHoursStart, setOpeningHoursStart] = useState(establishment?.openingHoursStart ? new Date(establishment.openingHoursStart) : new Date());
  const [openingOpeningHoursEnd, setOpeningHoursEnd] = useState(establishment?.openingHoursEnd ? new Date(establishment.openingHoursEnd) : new Date());
  const router = useRouter();

  async function handleUpdate(event: any) {
    event.preventDefault();
    const newUser = {
      ownerName,
      establishmentName,
      password,
      phone,
      category,
      maxCapacity,
      address: address,
      openingOpeningHoursStart: openingOpeningHoursStart,
      openingOpeningHoursEnd: openingOpeningHoursEnd,
      ownerId: localStorage.getItem('ownerId')
    };
    axios
      .put('http://localhost:3001/establishments', newUser, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
      .then(() => {
        router.push('/owner/home');
      })
      .catch(error => {
        console.log('error ', error);
      });
  }

  return (
    <>
      <section
        className={'flex flex-col  p-8 items-center justify-around text-center'}
      >
        <div className="bg-white shadow-md rounded m-auto h-auto flex">
          <div className="px-16 rounded shadow py-4 flex flex-col gap-4">
            <h2 className="text-2xl font-bold mb-2 text-center text-redMain">
              Atualizar dados
            </h2>
            <form
              className="flex flex-col gap-4 items-center"
              onSubmit={handleUpdate}
            >
              <div className="">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="owner-name"
                  type="text"
                  placeholder="Nome do Administrador"
                  value={ownerName}
                  onChange={e => setOwnerName(e.target.value)}
                />
              </div>
              <div className="">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
              <div className="">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="establishment-name"
                  type="text"
                  placeholder="Nome do Estabelecimento"
                  value={establishmentName}
                  onChange={e => setEstablishmentName(e.target.value)}
                />
              </div>
              <div className="">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="phone"
                  type="text"
                  placeholder="Telefone"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                />
              </div>
              <div className="">
                <select
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="category"
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                >
                  <option value="">Selecione uma opção</option>
                  <option value="restaurante">Restaurante</option>
                  <option value="cafe">Café</option>
                  <option value="lanchonete">Lanchonete</option>
                </select>
              </div>
              <div className="">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="max-capacity"
                  type="number"
                  placeholder="Capacidade Máxima"
                  value={maxCapacity}
                  onChange={e => setMaxCapacity( parseInt(e.target.value, 10))}
                />
              </div>
              <div className="">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="address"
                  type="text"
                  placeholder="Localização"
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                />
              </div>
              <div className="">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="opening_hours_start"
                  type="time"
                  placeholder="Horário Inicial"
                  value={openingOpeningHoursStart.toISOString().substring(11, 16)}
                  onChange={e => {
                    const [hours, minutes] = e.target.value.split(':');
                    const date = new Date();
                    date.setUTCHours(Number(hours));
                    date.setUTCMinutes(Number(minutes));
                    setOpeningHoursStart(date);
                  }}
                />
              </div>
              <div className="">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="opening_hours_end"
                  type="time"
                  placeholder="Horário Final"
                  value={openingOpeningHoursEnd.toISOString().substring(11, 16)}
                  onChange={e => {
                    const [hours, minutes] = e.target.value.split(':');
                    const date = new Date();
                    date.setUTCHours(Number(hours));
                    date.setUTCMinutes(Number(minutes));
                    setOpeningHoursEnd(date);
                  }}
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="border-2 border-white bg-redMain text-white font-bold p-2 px-8 rounded-3xl focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Atualizar
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
