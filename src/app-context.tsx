import { User } from 'firebase/auth';
import { createContext, useContext } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import { FCC } from './types';

interface IAppContext {
  user: User | null | undefined;
  loadingAuth: boolean;
  errorAuth: Error | undefined;
}

const AppContext = createContext({} as IAppContext);

export const AppProvider: FCC = ({ children }) => {
  const [user, loadingAuth, errorAuth] = useAuthState(auth);

  return (
    <AppContext.Provider value={{ user, loadingAuth, errorAuth }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  return useContext(AppContext);
};
