import './globals.css';
import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Raleway } from 'next/font/google';
import { MenuMobileContextProvider } from '@/contexts/MenuMobileContext';

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
        {children}
        </MenuMobileContextProvider>
      </body>
    </html>
  );
}
