'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useUserInfoContext } from '@/contexts/UserInfoContext';
import AlertMessage from '../AlertMessage';
import { TextField } from '@mui/material';

export default function Profile() {
  const { userInfo } = useUserInfoContext();
  const [name, setName] = useState(userInfo?.name ?? '');
  const [phone, setPhone] = useState(userInfo?.phone ?? '');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [sucessMessage, setSucessMessage] = useState('');
  const handleSuccessOpen = (message: string) => {
    setSucessMessage(message);
    setSuccessOpen(true);
  };
  const handleSuccessClose = () => {
    setSuccessOpen(false);
  };
  const handleErrorOpen = (message: string) => {
    setErrorMessage(message);
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
      .put(process.env.NEXT_PUBLIC_API_URL  ?? "https://reservegourmetsnackbackend.onrender.com/"+ 'users', newUser, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
      .then(() => {
        handleSuccessOpen('Dados atualizados com sucesso!');
        router.push('/user/home');
      })
      .catch(error => {
        handleErrorOpen(
          error?.response?.data?.message ?? 'Erro ao atualizar dados!'
        );
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
                <TextField
                  className="w-full"
                  label="Nome"
                  variant="outlined"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>

              <div className="">
                <TextField
                  className="w-full"
                  label="Password"
                  variant="outlined"
                  type="password"
                  onChange={e => setPassword(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <TextField
                  className="w-full"
                  label="Telefone"
                  variant="outlined"
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
          message={sucessMessage}
          onClose={handleSuccessClose}
        />
        <AlertMessage
          open={errorOpen}
          severity="error"
          message={errorMessage}
          onClose={handleErrorClose}
        />
      </section>
    </>
  );
}
