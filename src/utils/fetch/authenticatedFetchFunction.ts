import buildCookiesActions from "../cookies/buildCookiesActions";
import baseFetchFunction from "./baseFetchFunction";

type requestType<T> = {
  data: T | null;
  errors: Error | null;
  isLoading: boolean;
  status: number;
};
type authenticationResponseType = {
  token: string;
  refreshToken: string;
  permission: string[];
  roles: string[];
};

//manipulador de cookies
const { getCookies, setCookie, deleteCookie } = buildCookiesActions(undefined);

function setAuthorizationHeader(token: string, options?: RequestInit) {
  //atribuindo o token ao header
  const authenticatedHeader = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  if (!options) return authenticatedHeader;

  if (options && options.headers) {
    options.headers = Object.assign(
      options.headers,
      authenticatedHeader.headers
    );
  }

  return options;
}

//função para ser responsável por requisições autenticadas
export default async function authenticatedFetchFunction<T>(
  url: string,
  token: string,
  options?: RequestInit
): Promise<requestType<T>> {
  options = setAuthorizationHeader(token, options);

  //chamando fetch
  let response = await baseFetchFunction<T>(url, options);

  //realizando refreshToken
  if (response.status === 401) {
    //recuperando refresh token
    const refreshToken = getCookies("authJWT.refreshToken");

    //realizando requisição para atualizar tokens
    const refreshResponse = await baseFetchFunction<authenticationResponseType>(
      "/refresh",
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
          "Content-Length": "<length>",
          Accept: "*/*",
        },
        body: JSON.stringify({ refreshToken: refreshToken }),
        method: "POST",
      }
    );

    //tratamento de erro durante o refresh
    if (refreshResponse.errors || !refreshResponse.data) return response;

    //desestruturando dados
    const { token: newToken, refreshToken: newRefreshToken } =
      refreshResponse.data;

    //setando os novos cookies
    setCookie("authJWT.token", newToken);
    setCookie("authJWT.refreshToken", newRefreshToken);

    //setando novo header de autorização
    options = setAuthorizationHeader(newToken, options);

    //chamada da função com tokens atualizados
    response = await baseFetchFunction<T>(url, options);
  }

  return response;
}
