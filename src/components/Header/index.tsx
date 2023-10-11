'use client';
import Image from 'next/image';
import Link from 'next/link';
import { CgLogOut } from 'react-icons/cg';

type HeaderType = {
  owner: boolean;
};

export default function Header({ owner }: HeaderType) {
  const href = owner ? '/owner-login' : '/login';
  return (
    <header className="flex items-center justify-between px-4 py-2 bg-redMain">
      <Image src={'/logo.svg'} alt="Logo" width={60} height={50} />
      <Link
        className="text-white text-xl"
        href={href}
        onClick={() => {
          localStorage.removeItem('token');
          localStorage.removeItem('id');
        }}
      >
        <CgLogOut />
      </Link>
    </header>
  );
}
