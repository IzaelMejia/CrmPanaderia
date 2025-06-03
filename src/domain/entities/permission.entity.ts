export interface Permission {
  IdModulo: number;
  Nombre: string;
  NombreMostrar: string;
  CanCreate: boolean;
  CanRead: boolean;
  CanUpdate: boolean;
  CanDelete: boolean;
  CanActivateInactivate: boolean;
  OrdenModulo: number;
}