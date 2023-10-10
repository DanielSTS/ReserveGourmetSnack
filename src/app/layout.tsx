import './globals.css';
import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Raleway } from 'next/font/google';
import { EstablishmentsContextProvider } from '@/contexts/EstablishmentsContext';
import { ReservationsContextProvider } from '@/contexts/ReservationsContext';

const raleway = Raleway({ subsets: ['latin'] });
export const metadata: Metadata = {
  title: 'Reserve Gourmet Snack',
  description: 'The best solution for reserves.'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={
          'bg-background text-white md:mx-auto xl:max-w-screen-2xl flex flex-col min-h-screen'
        }
      >
        <ReservationsContextProvider>
          <EstablishmentsContextProvider>
            {children}
          </EstablishmentsContextProvider>
        </ReservationsContextProvider>
      </body>
    </html>
  );
}
