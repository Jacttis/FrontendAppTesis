import React, {
  createContext,
  PropsWithChildren,
  useState,
  useCallback,
} from "react";

type AuthContextType = {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  userToken: string | null;
  role: string | null;
  setUserToken: (userToken: string | null) => void;
  refreshToken: string | null;
  setRefreshToken: (refreshToken: string | null) => void;
  email: string | null;
  setEmail: (email: string | null) => void
  signIn: (accessToken: string, refreshToken: string, role: string, email: string) => void;
  signOut: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  isLoading: false,
  setIsLoading: () => {},
  userToken: null,
  setUserToken: () => {},
  refreshToken: null,
  role: null,
  setRefreshToken: () => {},
  email: null,
  setEmail: () => {},
  signIn: () => {},
  signOut: () => {},
});

export const AuthProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userToken, setUserToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [email,setEmail] = useState<string | null>(null)

  const signIn = useCallback(
    (accessToken: string, refreshToken: string, role: string,email:string) => {
      setUserToken(accessToken);
      setRefreshToken(refreshToken);
      setRole(role);
      setEmail(email);
    },
    []
  );

  const signOut = useCallback(() => {
    setUserToken(null);
    setRefreshToken(null);
    setRole(null);
    setEmail(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        setIsLoading,
        userToken,
        setUserToken,
        refreshToken,
        setRefreshToken,
        signIn,
        setEmail,
        email,
        role,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
