'use client';
import MenuItem from '@/components/MenuItem';
import Footer from '../Footer';

export default function Aside() {
  return (
    <aside className="flex flex-col justify-between h-screen bg-main w-64">
      <nav>
        <ul className="hidden md:flex flex-col items-left justify-center gap-4 mt-4">
          <li>
            <MenuItem href="/" label="Home" />
          </li>
          <li>
            <MenuItem href="/profile" label="Meu Perfil" />
          </li>
        </ul>
      </nav>
      <Footer />
    </aside>
  );
}
