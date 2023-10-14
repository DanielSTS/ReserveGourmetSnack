'use client';
import axios from 'axios';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react';

const EstablishmentsContext = createContext<EstablishmentData[]>([]);

export const useEstablishmentsContext = () => {
  return useContext(EstablishmentsContext);
};
export type EstablishmentData = {
  id: string;
  email: string;
  name: string;
  phone: string;
  openingHoursStart: Date;
  openingHoursEnd: Date;
  address: string;
  category: string;
  reviews: ReviewDto[];
};

export type ReviewDto = {
  id: string;
  rating: number;
  comment: string;
};

type EstablishmentsProviderProps = {
  children: ReactNode;
};

export function EstablishmentsContextProvider({
  children
}: EstablishmentsProviderProps) {
  const [EstablishmentsData, setEstablishmentsData] = useState<
    EstablishmentData[]
  >([]);

  async function fetchData() {
    try {
      const response = await axios.get(
        (process.env.NEXT_PUBLIC_API_URL ??
          'https://reservegourmetsnackbackend.onrender.com/') +
          'establishments',
        {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        }
      );
      const data = response.data as EstablishmentData[];
      console.log(data);
      setEstablishmentsData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    void fetchData();

    const interval = setInterval(() => {
      void fetchData();
    }, 10 * 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <EstablishmentsContext.Provider value={EstablishmentsData}>
      {children}
    </EstablishmentsContext.Provider>
  );
}
