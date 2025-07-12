export interface PresupuestoResponseDto {
  subcategorias: SubcategoriaPresupuesto[];
}

export interface SubcategoriaPresupuesto {
  nombre: string;
  porcentaje: number;
  monto: number;
}
