import { createContext, PropsWithChildren, useContext, useState } from "react";

type FakeSession = { user: { email: string } } | null;

type AuthContextType = {
  session: FakeSession;
  isLoading: boolean;
  signIn: (email: string) => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType>({
  session: null,
  isLoading: false,
  signIn: () => {},
  signOut: () => {},
});

export function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<FakeSession>(null);

  function signIn(email: string) {
    setSession({ user: { email } });
  }

  function signOut() {
    setSession(null);
  }

  return (
    <AuthContext.Provider
      value={{ session, isLoading: false, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
