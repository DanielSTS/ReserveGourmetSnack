'use client';
import axios from 'axios';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react';

const UserInfoContext = createContext<UserInfoData>({
  reservations: [],
  userInfo: {}
} as unknown as UserInfoData);

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
};

type ReservationsProviderProps = {
  children: ReactNode;
};

export function UserInfoContextProvider({
  children
}: ReservationsProviderProps) {
  const [userInfoData, setUserInfoData] = useState<UserInfoData>({
    reservations: [],
    userInfo: {}
  } as unknown as UserInfoData);

  async function fetchData() {
    const userId = localStorage.getItem('id');
    if (userId) {
      try {
        const response = await axios.get(
          process.env.NEXT_PUBLIC_API_URL+ `users/${userId}`,
          {
            headers: {
              Authorization: localStorage.getItem('token')
            }
          }
        );
        const data = response.data as UserInfoData;
        console.log(data);
        setUserInfoData(data);
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
    <UserInfoContext.Provider value={userInfoData}>
      {children}
    </UserInfoContext.Provider>
  );
}
