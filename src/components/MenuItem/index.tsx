'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type MenuItemProps = {
  href: string;
  label: string;
};
export default function MenuItem({ href, label }: MenuItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`${
        isActive
          ? 'text-redMain'
          : 'text-background hover:text-redMain hover:transition hover:duration-300'
      } p-4 text-xl font-semibold`}
    >
      {label}
    </Link>
  );
}
