import { ReactNode, createContext, useContext, useState } from 'react';
import getFromLocalStorage from '../services/localStorage/getFromLocalStorage';

export type AuthContextType = {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  accessToken: string;
  id: string;
  isNewUser: boolean;
  hasSubscribed: boolean;
  preferredJourney: string;
  loggedMood: boolean;
};

const AuthContext = createContext(
  {} as {
    user?: AuthContextType;
    setUser?: React.Dispatch<React.SetStateAction<AuthContextType>>;
  }
);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthContextType>(
    getFromLocalStorage('authentication')
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser: setUser as React.Dispatch<
          React.SetStateAction<AuthContextType>
        >,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}

export default AuthProvider;
