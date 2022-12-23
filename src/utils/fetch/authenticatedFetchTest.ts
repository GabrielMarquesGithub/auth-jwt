import baseFetchFunction from "./baseFetchFunction";

type requestType<T> = {
  data: T | null;
  errors: Error | null;
  isLoading: boolean;
  status: number;
};

//função para ser responsável por requisições autenticadas
export default function authenticatedFetchTest<T>(
  token: string,
  fetchFunction: (url: string, options?: RequestInit) => Promise<requestType<T>>
) {
  async function authenticatedFetchFunction(
    url: string,
    options?: RequestInit
  ): Promise<requestType<T>> {
    //atribuindo o token ao header
    const authenticatedHeader = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    options = Object.assign(authenticatedHeader, options);

    //chamando fetch
    return await fetchFunction(url, options);
  }
  return authenticatedFetchFunction;
}
