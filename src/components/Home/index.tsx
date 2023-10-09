import Favorites from "../Favorites";
import MyReserves from "../MyReserves";
import Restaurants from "../Restaurants";

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
        <Restaurants />
      </div>
    </div>
  );
}
