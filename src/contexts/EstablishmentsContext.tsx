'use client';
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
    await fetch('http://localhost:3001/establishments')
      .then(response => response.json())
      .then(data => {
        console.log(data as EstablishmentData[]);
        setEstablishmentsData(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
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
    <EstablishmentsContext.Provider value={EstablishmentsData}>
      {children}
    </EstablishmentsContext.Provider>
  );
}
