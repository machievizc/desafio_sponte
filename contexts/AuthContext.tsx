import { createContext, ReactNode, useEffect, useState } from "react";
import { CredentialType, User } from "../@types";
import API from "../services/API";

type AuthContextType = {
  user: User | undefined;
  signed: boolean;
  token: string;
  signIn(credential: CredentialType): Promise<void>;
  logout(): Promise<void>;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

type AuthContextProviderProp = {
  children: ReactNode;
};

export function AuthContextProvider(props: AuthContextProviderProp) {
  const [token, setToken] = useState("");
  const [user, setUser] = useState<User>();

  const keyUser = "@auth:user";
  const keyToken = "@auth:token";

  useEffect(() => {
    function loadDataFromLocalStorage() {
      // lendo do localStorage
      const storageUser = localStorage.getItem(keyUser);
      const storageToken = localStorage.getItem(keyToken);

      if (storageUser && storageToken) {
        setUser(JSON.parse(storageUser));
        setToken(storageToken);
      }
    }

    loadDataFromLocalStorage();
  }, []);

  async function signIn(credential: any) {
    await API.post("ed7a4f73-8c5b-4d53-9f72-ef4acc358418", credential).then(
      (result) => {
        let userList: Array<any> = JSON.parse(
          localStorage.getItem("@userlist") as string
        );

        if (userList) {
          const user = userList.find((u) => {
            return (
              u.email === credential.email && u.password === credential.password
            );
          });

          if (user) {
            localStorage.setItem(keyUser, JSON.stringify(user));
            localStorage.setItem(keyToken, result.data.token);

            setUser(user);
            setToken(result.data.token);
          }
        }
      }
    );
  }

  async function logout() {
    localStorage.removeItem(keyUser);
    localStorage.removeItem(keyToken);

    setUser(undefined);
    setToken("");
  }

  return (
    <AuthContext.Provider
      value={{ signed: !!user, user, token, signIn, logout }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
