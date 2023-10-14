'use client';
import axios from 'axios';
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
  comment: string;
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
  enabled: boolean;
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
      try {
        const response = await axios.get(
          (process.env.NEXT_PUBLIC_API_URL ??
            'https://reservegourmetsnackbackend.onrender.com/') +
            `owners/${ownerId}`,
          {
            headers: {
              Authorization: localStorage.getItem('token')
            }
          }
        );
        const data = response.data as OwnerInfoData;
        console.log(data);
        setOwnerInfoData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  }

  useEffect(() => {
    void fetchData();

    const interval = setInterval(() => {
      void fetchData();
    }, 5 * 1000);

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
