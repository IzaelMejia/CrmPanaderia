import axios, { AxiosError, AxiosRequestConfig } from "axios";

export class ApiClient {
  constructor(private baseUrl: string) {}

  setBaseUrl(url: string) {
    this.baseUrl = url;
  }
  //   Metodo Generico, "T" permite especificar el tipo de dato que espera recibir. {id: .. , name: ...}
  //   Genera la Uri completa más los headers

  async request<T>(path: string, options: AxiosRequestConfig = {}): Promise<T> {
    try {
      const url = `${this.baseUrl}${path}`;
      const response = await axios({ url, ...options });

      return response.data as T; // Retorna los datos con el tipo T
    } catch (error) {
      // Verificación de tipo de error
      if (axios.isAxiosError(error)) {
        this.handleError(error); // Solo si es un error de Axios
      } else {
        console.error("Error desconocido:", error); // Manejo de errores no relacionados con Axios
      }
      throw error; // Lanza el error después de manejarlo
    }
  }

  //   Con request (https://api.escuelajs.co/api/v1/auth/refresh-token)

  get<T>(path: string, headers: Record<string, string> = {}): Promise<T> {
    return this.request<T>(path, {
      method: "GET",
      headers,
    });
  }

  post<T>(
    path: string,
    body: any,
    headers: Record<string, string> = {}
  ): Promise<T> {
    return this.request<T>(path, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...headers },
      data: body,
    });
  }

  // Método para manejar errores
  private handleError(error: AxiosError): void {
    if (axios.isAxiosError(error)) {
      console.error("Error en la solicitud:", error.message);
      if (error.response) {
        // Respuesta del servidor
        console.error("Respuesta del servidor:", error.response.data);
      } else {
        // Error sin respuesta, probablemente un error de red
        console.error("Error de red o de conexión:", error.message);
      }
    } else {
      // Errores no relacionados con Axios
      console.error("Error desconocido:", error);
    }
  }
}

export const apiClient = new ApiClient("https://api.escuelajs.co/api/v1");
