import { Injectable } from '@angular/core';
import { ApiService } from '../core/services/api.service';
import { Observable } from 'rxjs';
import { PresupuestoRequestDto } from '../shared/models/presupuesto-request.dto';
import { PresupuestoResponseDto } from '../shared/models/presupuesto-response.dto';

@Injectable({
  providedIn: 'root'
})
export class PresupuestoService {
  constructor(private apiService: ApiService) {}

  generarPresupuesto(datos: PresupuestoRequestDto): Observable<PresupuestoResponseDto> {
    return this.apiService.post<PresupuestoRequestDto, PresupuestoResponseDto>(
      '/api/presupuesto/recomendar',
      datos
    );
  }

  guardarDatosFormulario(datos: PresupuestoRequestDto): void {
    localStorage.setItem('presupuesto_form_data', JSON.stringify(datos));
  }

  obtenerDatosFormulario(): PresupuestoRequestDto | null {
    const datos = localStorage.getItem('presupuesto_form_data');
    return datos ? JSON.parse(datos) : null;
  }

  guardarResultado(resultado: PresupuestoResponseDto): void {
    localStorage.setItem('presupuesto_resultado', JSON.stringify(resultado));
  }

  obtenerResultado(): PresupuestoResponseDto | null {
    const resultado = localStorage.getItem('presupuesto_resultado');
    return resultado ? JSON.parse(resultado) : null;
  }
}
