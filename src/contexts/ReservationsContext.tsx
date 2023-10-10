'use client';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react';

const ReservationsContext = createContext<ReservationData[]>([]);

export const useReservationsContext = () => {
  return useContext(ReservationsContext);
};
export type ReservationData = {
  id: string;
  userId: string;
  establishmentId: string;
  category: string;
  establishmentName: string;
  datetime: Date;
  numPeople: number;
  observation: string;
};

type ReservationsProviderProps = {
  children: ReactNode;
};

export function ReservationsContextProvider({
  children
}: ReservationsProviderProps) {
  const [ReservationsData, setReservationsData] = useState<ReservationData[]>(
    []
  );

  async function fetchData() {
    const userId = localStorage.getItem('id');
    if (userId) {
      await fetch(`http://localhost:3001/reservations-by-user-id/${userId}`)
        .then(response => response.json())
        .then(data => {
          console.log(data as ReservationData[]);
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
    }, 30 * 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <ReservationsContext.Provider value={ReservationsData}>
      {children}
    </ReservationsContext.Provider>
  );
}
