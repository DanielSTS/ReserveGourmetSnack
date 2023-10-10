import { ReactNode } from 'react';
import './../globals.css';
import Header from '@/components/Header';
import Aside from '@/components/Aside';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header owner={true} />
      <div className="flex flex-1">
        <Aside owner={false}/>
        <main className="flex-1">{children}</main>
      </div>
    </>
  );
}
