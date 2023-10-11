import './globals.css';
import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Raleway } from 'next/font/google';

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
          'bg-background text-white md:mx-auto  flex flex-col min-h-screen'
        }
      >
        {children}
      </body>
    </html>
  );
}
