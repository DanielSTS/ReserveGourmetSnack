'use client';
import { useOwnerInfoContext } from '@/contexts/OwnerInfoContext';
import Favorites from '../Favorites';
import ReservesOwner from '../ReservesOwner';

export default function HomeOwner() {
  const { reservations: reservationsData } = useOwnerInfoContext();
  return (
    <div className="grid grid-cols-2 h-screen">
      <div className="col-span-2 md:col-span-1 p-4 bg-white rounded shadow m-4 h-auto">
        <h1 className="text-zinc-600 text-2xl">Total de Reservas</h1>
        <p className="text-zinc-600 text-9xl text-center h-auto">
          {reservationsData?.length ?? 0}
        </p>
      </div>
      <div className="col-span-2 md:col-span-1">
        <Favorites />
      </div>
      <div className="col-span-2 md:col-span-2">
        <ReservesOwner />
      </div>
    </div>
  );
}
