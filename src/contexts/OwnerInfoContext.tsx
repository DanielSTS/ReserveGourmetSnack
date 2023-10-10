'use client';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react';

const OwnerInfoContext = createContext<OwnerInfoData>({
  reservations: [],
  ownerInfo: {}
} as unknown as OwnerInfoData);

export const useOwnerInfoContext = () => {
  return useContext(OwnerInfoContext);
};

export type ReservationDto = {
  id: string;
  userId: string;
  userName?: string;
  datetime: Date;
  numPeople: number;
  observation: string;
};

type OwnerDto = {
  id: string;
  name: string;
  phone: string;
};

export type OwnerInfoData = {
  ownerInfo: OwnerDto;
  reservations: ReservationDto[];
};

type ReservationsProviderProps = {
  children: ReactNode;
};

export function OwnerInfoContextProvider({
  children
}: ReservationsProviderProps) {
  const [ReservationsData, setReservationsData] = useState<OwnerInfoData>({
    reservations: [],
    ownerInfo: {}
  } as unknown as OwnerInfoData);

  async function fetchData() {
    const ownerId = localStorage.getItem('id');
    if (ownerId) {
      await fetch(`http://localhost:3001/owners/${ownerId}`)
        .then(response => response.json())
        .then(data => {
          console.log(data as OwnerInfoData);
          setReservationsData(data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
  }

  useEffect(() => {
    void fetchData();

    const interval = setInterval(() => {
      void fetchData();
    }, 300 * 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <OwnerInfoContext.Provider value={ReservationsData}>
      {children}
    </OwnerInfoContext.Provider>
  );
}
