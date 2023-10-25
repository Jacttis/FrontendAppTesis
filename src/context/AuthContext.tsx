import React, { createContext, PropsWithChildren, useState, useCallback } from "react";

type AuthContextType = {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  userToken: string | null;
  setUserToken: (userToken: string | null) => void;
  refreshToken: string | null;
  setRefreshToken: (refreshToken: string | null) => void;
  signIn: (accessToken: string, refreshToken: string) => void;
  signOut: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  isLoading: false,
  setIsLoading: () => {
  },
  userToken: null,
  setUserToken: () => {
  },
  refreshToken: null,
  setRefreshToken: () => {
  },
  signIn: () => {
  },
  signOut: () => {
  }
});

export const AuthProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userToken, setUserToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  const signIn = useCallback((accessToken: string, refreshToken: string) => {
    setUserToken(accessToken);
    setRefreshToken(refreshToken);
  }, []);

  const signOut = useCallback(() => {
    setUserToken(null);
    setRefreshToken(null);
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
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
