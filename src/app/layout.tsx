import './globals.css';
import { ReactNode } from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import { Raleway } from 'next/font/google';
import { MenuMobileContextProvider } from '@/contexts/MenuMobileContext';
import Aside from '@/components/Aside';

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
        <MenuMobileContextProvider>
        <Header />
        <div className="flex flex-1">
          <aside className="w-64">
            <Aside />
          </aside>
          <main className="flex-1">
            {children}
          </main>
        </div>
        </MenuMobileContextProvider>
      </body>
    </html>
  );
}
