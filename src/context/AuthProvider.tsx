import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import getFromLocalStorage from '../services/localStorage/getFromLocalStorage';
import useAuthUser from '../services/userAuth/authUser';
import setToLocalStorage from '../services/localStorage/setToLocalStorage';

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
  dateOfBirth?: string;
  image: string;
  isGoogleLoggedIn: boolean;
};

export type SignUpUserType = {
  email: string;
  name: string;
};

const AuthContext = createContext(
  {} as {
    user?: AuthContextType;
    setUser?: React.Dispatch<React.SetStateAction<AuthContextType>>;
    signUpUser?: SignUpUserType;
    setSignUpUser?: React.Dispatch<React.SetStateAction<SignUpUserType>>;
    isLoading: boolean;
  }
);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthContextType>(
    getFromLocalStorage('authentication')
  );
  const [signUpUser, setSignUpUser] = useState<SignUpUserType>({
    email: '',
    name: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const { data: authenticatedUser, status } = useAuthUser();
  useEffect(() => {
    if (status === 'loading') {
      setIsLoading(() => true);
    } else if (status === 'success') {
      console.log(authenticatedUser);
      authenticatedUser &&
        setUser(
          () =>
            ({
              firstName: authenticatedUser.firstName,
              lastName: authenticatedUser.lastName,
              email: authenticatedUser.email,
              role: authenticatedUser.role,
              accessToken: authenticatedUser._id,
              id: authenticatedUser._id,
              isNewUser: authenticatedUser.isNewUser,
              hasSubscribed: authenticatedUser.hasSubscribed,
              preferredJourney: authenticatedUser.preferredJourney,
              loggedMood: authenticatedUser.loggedMood,
              image: authenticatedUser.image,
              dateOfBirth: authenticatedUser.dateOfBirth,
              isGoogleLoggedIn: authenticatedUser.isGoogleLoggedIn,
            } as AuthContextType)
        );
      authenticatedUser &&
        setToLocalStorage('authentication', authenticatedUser);
      setIsLoading(() => false);
    } else if (status === 'error') {
      setIsLoading(() => false);
    }
  }, [authenticatedUser?.email]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser: setUser as React.Dispatch<
          React.SetStateAction<AuthContextType>
        >,
        isLoading,
        signUpUser,
        setSignUpUser,
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
