import axios, { AxiosRequestConfig } from "axios";

export class ApiClient {
  constructor(private baseUrl: string) {}

  setBaseUrl(url: string) {
    this.baseUrl = url;
  }
  //   Metodo Generico, "T" permite especificar el tipo de dato que espera recibir. {id: .. , name: ...}
  //   Genera la Uri completa más los headers
  async request<T>(path: string, options: AxiosRequestConfig = {}): Promise<T> {
    const url = `${this.baseUrl}${path}`;
    const response = await axios({ url, ...options });
    // console.log("Response:", response);
    return response.data as T; //Respuesta tipo T
  }

  //   Con request (https://api.escuelajs.co/api/v1/auth/refresh-token)

  get<T>(path: string, headers: Record<string, string> = {}): Promise<T> {
    return this.request<T>(path, {
      method: "GET",
      headers,
    });
  }

   post<T>(path: string, body: any, headers: Record<string, string> = {}): Promise<T> {
    return this.request<T>(path, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...headers },
      data: body,
    });
  }
}

export const apiClient = new ApiClient("https://api.escuelajs.co/api/v1");
