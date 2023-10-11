import { ReactNode } from 'react';
import './../globals.css';
import Header from '@/components/Header';
import Aside from '@/components/Aside';
import { UserInfoContextProvider } from '@/contexts/UserInfoContext';
import { EstablishmentsContextProvider } from '@/contexts/EstablishmentsContext';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <UserInfoContextProvider>
        <EstablishmentsContextProvider>
          <Header owner={true} />
          <div className="flex flex-1">
            <Aside owner={false} />
            <main className="flex-1">{children}</main>
          </div>
        </EstablishmentsContextProvider>
      </UserInfoContextProvider>
    </>
  );
}
