'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import FAQ from '../Faq';
import AlertMessage from '../AlertMessage';
import { TextField } from '@mui/material';

export default function RegisterOwner() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
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

  async function handleRegister(event: any) {
    event.preventDefault();
    const newUser = {
      name,
      email,
      password
    };
    axios
      .post('http://localhost:3001/owners', newUser)
      .then(() => {
        router.push('/owner-login');
      })
      .catch(error => {
        console.log('error ', error);
      });
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-32 gap-10">
      <div className="bg-white shadow-md rounded m-auto h-auto flex">
        <div className="w-1/3 flex flex-col p-8 gap-16 bg-redMain shadow-md rounded">
          <Image
            className={'w-96 h-36 text-redMain'}
            src={'/admin-white.svg'}
            alt="Logo"
            width={140}
            height={140}
          />
          <p className="">
            <strong>Já tem uma conta admin ? </strong> Acesse sua conta agora
            mesmo!
          </p>
          <Link
            className="border-2 border-white bg-redMain text-white font-bold p-2 rounded-3xl focus:outline-none focus:shadow-outline text-center"
            href="/owner-login"
          >
            Entrar
          </Link>
        </div>
        <div className="w-2/3 p-4  flex flex-col gap-4">
          <h2 className="text-2xl font-bold mb-6 mt-4 text-center text-redMain">
            Criar Conta Admin
          </h2>
          <form
            className="flex flex-col gap-4 items-center"
            onSubmit={handleRegister}
          >
            <div className="mb-4">
              <TextField
                className="w-full"
                label="Username"
                variant="outlined"
                onChange={e => setName(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <TextField
                className="w-full"
                label="Email"
                variant="outlined"
                type="email"
                onChange={e => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <TextField
                className="w-full"
                label="Password"
                variant="outlined"
                type="password"
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="border-2 border-white bg-redMain text-white font-bold p-2 px-8 rounded-3xl focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Cadastre-se
              </button>
            </div>
          </form>
        </div>
      </div>
      <FAQ />
      <AlertMessage
        open={successOpen}
        severity="success"
        message="Login realizado com sucesso!"
        onClose={handleSuccessClose}
      />
      <AlertMessage
        open={errorOpen}
        severity="error"
        message="Erro ao fazer o login. Verifique suas credenciais."
        onClose={handleErrorClose}
      />
    </div>
  );
}
