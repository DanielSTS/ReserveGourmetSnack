'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import AlertMessage from '../AlertMessage';
import { TextField } from '@mui/material';

export default function LoginOwner() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
  async function handleLogin(event: any) {
    event.preventDefault();
    const login = {
      email,
      password
    };
    axios
      .post(
        (process.env.NEXT_PUBLIC_API_URL ??
          'https://reservegourmetsnackbackend.onrender.com/') + 'login-owner',
        login
      )
      .then(response => {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('ownerId', response.data.id);
        handleSuccessOpen('Login realizado com sucesso!');
        router.push('/owner/home');
      })
      .catch(error => {
        handleErrorOpen(
          error?.response?.data?.message ??
            'Erro ao fazer o login. Verifique suas credenciais.'
        );
        console.log('error ', error);
      });
  }

  return (
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
          <strong>Ainda não tem uma conta ? </strong> Cadastre-se agora mesmo!
        </p>
        <Link
          className="border-2 border-white bg-redMain text-white font-bold p-2 rounded-3xl focus:outline-none focus:shadow-outline text-center"
          href="/owner-register"
        >
          Cadastre-se
        </Link>
      </div>
      <div className="w-2/3 p-4 py-16 flex flex-col gap-4">
        <h2 className="text-2xl font-bold mb-8 text-center text-redMain">
          Acesse sua conta
        </h2>
        <form
          className="flex flex-col gap-4 items-center"
          onSubmit={handleLogin}
        >
          <div className="mb-4">
            <TextField
              className="w-full"
              label="Email"
              variant="outlined"
              type="email"
              placeholder="Email"
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div className="">
            <TextField
              className="w-full"
              label="Password"
              variant="outlined"
              type="password"
              placeholder="Password"
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <Link
            className="font-bold text-sm text-redMain text-left"
            href="/owner-recoverpassword"
          >
            Esqueceu sua senha ?
          </Link>
          <div className="flex items-center justify-between">
            <button
              className="border-2 border-white bg-redMain text-white font-bold p-2 px-8 rounded-3xl focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Entrar
            </button>
          </div>
        </form>
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
    </div>
  );
}
