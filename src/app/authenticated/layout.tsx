import { ReactNode } from 'react';
import './../globals.css';
import Header from '@/components/Header';
import Aside from '@/components/Aside';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <div className="flex flex-1">
        <Aside />
        <main className="flex-1">{children}</main>
      </div>
    </>
  );
}
