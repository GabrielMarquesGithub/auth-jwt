import {
  createContext,
  ReactNode,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import Router from "next/router";

import baseFetchFunction from "../../utils/fetch/baseFetchFunction";
import authenticatedFetchFunction from "../../utils/fetch/authenticatedFetchFunction";
import buildCookiesActions from "../../utils/cookies/buildCookiesActions";

type userType = {
  email: string;
  permission: string[];
  roles: string[];
};

type authenticationResponseType = {
  token: string;
  refreshToken: string;
  permission: string[];
  roles: string[];
};

type signInCredentialsType = {
  email: string;
  password: string;
};

type AuthContextDataType = {
  signIn(credentials: signInCredentialsType): Promise<boolean>; //função de autenticação
  signOut(): void;
  isAuthenticated: boolean; //se o user está autenticado
  user: userType | null; //dados do usuário
};

type AuthProviderPropsType = { children: ReactNode };

//esse contexto busca, mantém e desconecta user
export const AuthContext = createContext({} as AuthContextDataType);

export const AuthProvider = ({ children }: AuthProviderPropsType) => {
  //estado para armazenar user
  const [user, setUser] = useState<userType | null>(null);

  //se existir user o autenticação está ativa
  const isAuthenticated = !!user;

  const { getCookies, setCookie, deleteCookie } = useMemo(
    () => buildCookiesActions(undefined),
    []
  );

  //função de autenticação
  const signIn = async ({
    email,
    password,
  }: signInCredentialsType): Promise<boolean> => {
    //estruturando dados
    const data = { email, password };
    //chamada a API
    const response = await baseFetchFunction<authenticationResponseType>(
      "/sessions",
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    //tratamento de erro
    if (response.errors || !response.data) return false;

    //desestruturando dados
    const { permission, roles, token, refreshToken } = response.data;

    setCookie("authJWT.token", token);
    setCookie("authJWT.refreshToken", refreshToken);

    //setando o usuário
    setUser({
      email,
      permission,
      roles,
    });

    return true;
  };

  //funções para logoff
  const signOut = useCallback(() => {
    //destruição de cookies
    deleteCookie("authJWT.token");
    deleteCookie("authJWT.refreshToken");
    //removendo user
    setUser(null);
    Router.push("/");
  }, [deleteCookie]);

  //função de atualização dos dados
  useEffect(() => {
    //desestruturando em busca de cookies
    const token = getCookies("authJWT.token");

    //função que se auto chama
    (async () => {
      if (token) {
        //buscando user já autenticando
        const response = await authenticatedFetchFunction<userType>(
          "/me",
          token
        );

        //testes com a utilização de HighOrderFunctions
        // const authenticatedFetchFunction = authenticatedFetchTest<userType>(
        //   token,
        //   baseFetchFunction
        // );
        // const response = await authenticatedFetchFunction("/me");

        //tratamento de erro
        if (response.errors || !response.data) return signOut();

        //setando o usuário
        return setUser(response.data);
      }
    })();
  }, [getCookies, signOut]);

  return (
    <AuthContext.Provider value={{ signIn, signOut, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
};
