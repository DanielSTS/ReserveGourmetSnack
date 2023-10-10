import Favorites from '../Favorites';
import MyReserves from '../MyReserves';
import Establishments from '../Establishments';

export default function Home() {
  return (
    <div className="grid grid-cols-2 h-screen">
      <div className="col-span-2 md:col-span-1">
        <MyReserves />
      </div>
      <div className="col-span-2 md:col-span-1">
        <Favorites />
      </div>
      <div className="col-span-2 md:col-span-2">
        <Establishments />
      </div>
    </div>
  );
}
