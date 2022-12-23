import fetchFunction from "./fetchFunction";

type requestType<T> = {
  data: T | null;
  errors: Error | null;
  isLoading: boolean;
  status: number;
};

export default async function baseFetchFunction<T>(
  url: string,
  options?: RequestInit
): Promise<requestType<T>> {
  //configurando a base da requisição
  const baseUrl = "http://localhost:3333";
  const baseOptions = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    credentials: "same-origin",
  };

  url = baseUrl + url;
  options = Object.assign(baseOptions, options);
  //repassando a requisição
  return await fetchFunction<T>(url, options);
}
