import { TextField } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

export default function RecoverPasswordOwner() {
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
      <div className="w-2/3 p-4 py-8 flex flex-col gap-6 justify-between">
        <h2 className="text-2xl font-bold text-center text-redMain">
          Recupere sua senha
        </h2>
        <p className="text-sm font-bold text-center text-redMain">
          Digite seu e-mail para recuperar a senha
        </p>
        <form className="flex flex-col gap-16 items-center justify-between">
          <TextField
            className="w-full"
            label="Email"
            variant="outlined"
            type="email"
            placeholder="Email"
          />
          <div className="flex flex-col gap-4 items-center justify-between">
            <button
              className="border-2 border-white bg-redMain text-white font-bold p-2 px-8 rounded-3xl focus:outline-none focus:shadow-outline"
              type="button"
            >
              Confirmar
            </button>
            <Link
              className="border-2 border-zinc-400 bg-white text-zinc-400 font-bold p-2 px-8 rounded-3xl focus:outline-none focus:shadow-outline"
              href="/owner-login"
            >
              Voltar
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
