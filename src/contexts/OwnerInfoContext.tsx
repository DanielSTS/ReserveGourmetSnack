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
  owner: {},
  establishment: {}
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
};

type EstablishmentDto = {
  id: string;
  name: string;
  ownerName?: string;
  phone: string;
  openingHoursStart: Date;
  openingHoursEnd: Date;
  address: string;
  category: string;
  maxCapacity: number;
};

export type OwnerInfoData = {
  owner: OwnerDto;
  establishment?: EstablishmentDto;
  reservations: ReservationDto[];
};

type ReservationsProviderProps = {
  children: ReactNode;
};

export function OwnerInfoContextProvider({
  children
}: ReservationsProviderProps) {
  const [ownerInfoData, setOwnerInfoData] = useState<OwnerInfoData>({
    reservations: [],
    owner: {},
    establishment: {}
  } as unknown as OwnerInfoData);

  async function fetchData() {
    const ownerId = localStorage.getItem('ownerId');
    if (ownerId) {
      await fetch(`http://localhost:3001/owners/${ownerId}`)
        .then(response => response.json())
        .then(data => {
          console.log(data as OwnerInfoData);
          setOwnerInfoData(data);
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
    <OwnerInfoContext.Provider value={ownerInfoData}>
      {children}
    </OwnerInfoContext.Provider>
  );
}