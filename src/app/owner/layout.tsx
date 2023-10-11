import { ReactNode } from 'react';
import './../globals.css';
import Header from '@/components/Header';
import Aside from '@/components/Aside';
import { OwnerInfoContextProvider } from '@/contexts/OwnerInfoContext';
import { EstablishmentsContextProvider } from '@/contexts/EstablishmentsContext';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <OwnerInfoContextProvider>
        <EstablishmentsContextProvider>
          <Header owner={true} />
          <div className="flex flex-1">
            <Aside owner={true} />
            <main className="flex-1">{children}</main>
          </div>
        </EstablishmentsContextProvider>
      </OwnerInfoContextProvider>
    </>
  );
}
