import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="flex flex-col gap-2 py-2 items-center justify-around">
      <Image
        className={'w-96 h-24 text-redMain'}
        src={'admin.svg'}
        alt="Logo"
        width={140}
        height={140}
      />
    </footer>
  );
}
