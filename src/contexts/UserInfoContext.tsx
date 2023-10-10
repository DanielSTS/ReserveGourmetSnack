'use client';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react';

const UserInfoContext = createContext<UserInfoData>({} as UserInfoData);

export const useUserInfoContext = () => {
  return useContext(UserInfoContext);
};

type ReservationDto = {
  id: string;
  userId: string;
  establishmentId: string;
  category: string;
  establishmentName: string;
  datetime: Date;
  numPeople: number;
  observation: string;
};

type UserDto = {
  id: string;
  name: string;
  phone: string;
};

export type UserInfoData = {
  userInfo: UserDto;
  reservations: ReservationDto[];
}

type ReservationsProviderProps = {
  children: ReactNode;
};

export function UserInfoContextProvider({
  children
}: ReservationsProviderProps) {
  const [ReservationsData, setReservationsData] = useState<UserInfoData>({} as UserInfoData);

  async function fetchData() {
    const userId = localStorage.getItem('id');
    if (userId) {
      await fetch(`http://localhost:3001/users/${userId}`)
        .then(response => response.json())
        .then(data => {
          console.log(data as UserInfoData);
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
    <UserInfoContext.Provider value={ReservationsData}>
      {children}
    </UserInfoContext.Provider>
  );
}
