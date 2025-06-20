export class ApiClient {
  constructor(private baseUrl: string) {}

  setBaseUrl(url: string) {
    this.baseUrl = url;
  }
  //   Metodo Generico, "T" permite especificar el tipo de dato que espera recibir. {id: .. , name: ...}
  //   Genera la Uri completa más los headers
  async request<T>(path: string, options: RequestInit = {}): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`, options);
    console.log("Respose:", response);
    if (!response.ok) {
      const text = await response.text();
      throw new Error(text || response.statusText);
    }
    return (await response.json()) as T; //Respuesta tipo T
  }

  //   Con request (https://api.escuelajs.co/api/v1/auth/refresh-token)

  get<T>(path: string, headers: HeadersInit = {}): Promise<T> {
    return this.request<T>(path, { headers });
  }

  post<T>(path: string, body: any, headers: HeadersInit = {}): Promise<T> {
    return this.request<T>(path, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...headers },
      body: JSON.stringify(body),
    });
  }
}

export const apiClient = new ApiClient("https://api.escuelajs.co/api/v1");
