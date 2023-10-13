'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useUserInfoContext } from '@/contexts/UserInfoContext';
import AlertMessage from '../AlertMessage';

export default function Profile() {
  const { userInfo } = useUserInfoContext();
  const [name, setName] = useState(userInfo?.name ?? '');
  const [phone, setPhone] = useState(userInfo?.phone ?? '');
  const [password, setPassword] = useState('');
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
    const newUser = {
      name,
      phone,
      password,
      id: localStorage.getItem('id')
    };
    axios
      .put('http://localhost:3001/users', newUser, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
      .then(() => {
        router.push('/user/home');
      })
      .catch(error => {
        console.log('error ', error);
      });
  }

  return (
    <>
      <section
        className={
          'flex flex-col gap-4 px-12 pt-12 items-center justify-around text-center'
        }
      >
        <div className="bg-white shadow-md rounded m-auto h-auto flex">
          <div className="p-16 rounded shadow py-16 flex flex-col gap-4">
            <h2 className="text-2xl font-bold mb-8 text-center text-redMain">
              Atualizar dados
            </h2>
            <form
              className="flex flex-col gap-6 items-center"
              onSubmit={handleUpdate}
            >
              <div className="">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                  placeholder="Nome"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>
              <div className="">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="Password"
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="phone"
                  type="text"
                  placeholder="Telefone"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
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
