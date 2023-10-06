'use client';
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState
} from 'react';

const MenuMobileContext = createContext<MenuMobileData>(null!);

export const useMenuMobileContext = () => {
  return useContext(MenuMobileContext);
};

type MenuMobileData = {
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
};

type MenuMobileProviderProps = {
  children: ReactNode;
};

export function MenuMobileContextProvider({
  children
}: MenuMobileProviderProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  return (
    <MenuMobileContext.Provider value={{ isVisible, setIsVisible }}>
      {children}
    </MenuMobileContext.Provider>
  );
}
