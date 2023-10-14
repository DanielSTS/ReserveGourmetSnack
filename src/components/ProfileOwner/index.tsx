'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useOwnerInfoContext } from '@/contexts/OwnerInfoContext';
import AlertMessage from '../AlertMessage';
import { Checkbox, MenuItem, Select, TextField } from '@mui/material';

export default function ProfileOwner() {
  const { owner, establishment } = useOwnerInfoContext();
  const [ownerName, setOwnerName] = useState(owner.name ?? '');
  const [password, setPassword] = useState('');
  const [establishmentName, setEstablishmentName] = useState(
    establishment?.name ?? ''
  );
  const [phone, setPhone] = useState(establishment?.phone ?? '');
  const [category, setCategory] = useState(
    establishment?.category ?? 'restaurante'
  );
  const [maxCapacity, setMaxCapacity] = useState(
    establishment?.maxCapacity ?? 0
  );
  const [address, setAddress] = useState(establishment?.address ?? '');
  const [openingHoursStart, setOpeningHoursStart] = useState(
    establishment?.openingHoursStart
      ? new Date(establishment.openingHoursStart)
      : new Date()
  );
  const [openingHoursEnd, setOpeningHoursEnd] = useState(
    establishment?.openingHoursEnd
      ? new Date(establishment.openingHoursEnd)
      : new Date()
  );

  const [enabled, setEnabled] = useState(establishment?.enabled ?? false);
  const router = useRouter();

  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const handleSuccessOpen = () => {
    setSuccessOpen(true);
  };
  const handleSuccessClose = () => {
    setSuccessOpen(false);
  };
  const handleErrorOpen = () => {
    setErrorOpen(true);
  };
  const handleErrorClose = () => {
    setErrorOpen(false);
  };

  async function handleUpdate(event: any) {
    event.preventDefault();
    const data = {
      ownerName,
      establishmentName,
      password,
      phone,
      category,
      maxCapacity,
      address: address,
      openingHoursStart,
      openingHoursEnd,
      ownerId: localStorage.getItem('ownerId'),
      enabled
    };
    axios
      .put(
        'https://reservegourmetsnackbackend.onrender.com/establishments',
        data,
        {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        }
      )
      .then(() => {
        handleSuccessOpen();
        router.push('/owner/home');
      })
      .catch(error => {
        handleErrorOpen();
        console.log('error ', error);
      });
  }

  return (
    <>
      <section
        className={'flex flex-col  p-8 items-center justify-around text-center'}
      >
        <div className="bg-white shadow-md rounded m-auto h-auto flex">
          <div className="px-32 rounded shadow py-4 flex flex-col gap-4">
            <h2 className="text-2xl font-bold mb-2 text-center text-redMain">
              Atualizar dados
            </h2>
            <form
              className="flex flex-col gap-4 items-center"
              onSubmit={handleUpdate}
            >
              <TextField
                id="owner-name"
                label="Nome do Administrador"
                value={ownerName}
                onChange={e => setOwnerName(e.target.value)}
              />

              <TextField
                id="password"
                label="Password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />

              <TextField
                id="establishment-name"
                label="Nome do Estabelecimento"
                type="text"
                placeholder="Nome do Estabelecimento"
                value={establishmentName}
                onChange={e => setEstablishmentName(e.target.value)}
              />

              <TextField
                id="phone"
                label="Telefone"
                type="text"
                placeholder="Telefone"
                value={phone}
                onChange={e => setPhone(e.target.value)}
              />

              <Select
                id="category"
                value={category}
                onChange={e => setCategory(e.target.value)}
              >
                <MenuItem value="restaurante">Restaurante</MenuItem>
                <MenuItem value="cafe">Café</MenuItem>
                <MenuItem value="lanchonete">Lanchonete</MenuItem>
              </Select>

              <TextField
                id="max-capacity"
                type="number"
                label="Capacidade Máxima"
                value={maxCapacity}
                onChange={e => setMaxCapacity(parseInt(e.target.value, 10))}
              />

              <TextField
                id="address"
                type="text"
                label="Localização"
                value={address}
                onChange={e => setAddress(e.target.value)}
              />

              <div className="flex justify-between gap-4">
                <TextField
                  id="opening_hours_start"
                  type="time"
                  label="Horário Inicial"
                  value={openingHoursStart.toISOString().substring(11, 16)}
                  onChange={e => {
                    const [hours, minutes] = e.target.value.split(':');
                    const date = new Date();
                    date.setUTCHours(Number(hours));
                    date.setUTCMinutes(Number(minutes));
                    setOpeningHoursStart(date);
                  }}
                />

                <TextField
                  id="opening_hours_end"
                  type="time"
                  label="Horário Final"
                  value={openingHoursEnd.toISOString().substring(11, 16)}
                  onChange={e => {
                    const [hours, minutes] = e.target.value.split(':');
                    const date = new Date();
                    date.setUTCHours(Number(hours));
                    date.setUTCMinutes(Number(minutes));
                    setOpeningHoursEnd(date);
                  }}
                />
              </div>

              <div>
                <label htmlFor="enabled" className="flex items-center">
                  <input
                    type="checkbox"
                    id="enabled"
                    checked={enabled}
                    onChange={e => setEnabled(e.target.checked)}
                  />
                  <span className="ml-2 text-zinc-800">Ativar</span>
                </label>
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
        <AlertMessage
          open={successOpen}
          severity="success"
          message="Dados atualizados com sucesso!"
          onClose={handleSuccessClose}
        />
        <AlertMessage
          open={errorOpen}
          severity="error"
          message="Erro ao atualizar dados!"
          onClose={handleErrorClose}
        />
      </section>
    </>
  );
}
