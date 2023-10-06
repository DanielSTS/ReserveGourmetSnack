'use client';
import Image from 'next/image';
import { CgLogOut } from 'react-icons/cg';

export default function Header() {
  return (
    <header className="flex items-center justify-between px-4 py-2 bg-redMain">
      <Image src={'logo.svg'} alt="Logo" width={60} height={50}/>
      <button className="text-white text-xl">
        <CgLogOut />
      </button>
    </header>
  );
}
