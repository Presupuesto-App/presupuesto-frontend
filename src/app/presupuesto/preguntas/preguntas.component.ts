import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PresupuestoService } from '../presupuesto.service';
import { PresupuestoRequestDto } from '../../shared/models/presupuesto-request.dto';

@Component({
  selector: 'app-preguntas',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCheckboxModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.css']
})
export class PreguntasComponent implements OnInit {
  preguntasForm: FormGroup;
  isLoading = false;

  tiposVivienda = [
    { valor: 'propia', etiqueta: 'Vivienda propia' },
    { valor: 'propia con hipoteca', etiqueta: 'Vivienda propia con hipoteca' },
    { valor: 'alquilada', etiqueta: 'Vivienda alquilada' },
    { valor: 'familiar', etiqueta: 'Vivienda familiar (no paga)' }
  ];

  frecuenciaComidas = [
    { valor: 'baja', etiqueta: 'Casi nunca (0-2 veces/mes)' },
    { valor: 'media', etiqueta: 'Ocasional (1-2 veces/semana)' },
    { valor: 'alta', etiqueta: 'Frecuente (3+ veces/semana)' }
  ];

  constructor(
    private fb: FormBuilder,
    private presupuestoService: PresupuestoService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.preguntasForm = this.fb.group({
      sueldoMensual: ['', [Validators.required, Validators.min(0)]],
      tipoVivienda: ['', [Validators.required]],
      viveSolo: [false],
      tieneHijos: [false],
      usaCarro: [false],
      comidasFueraFrecuencia: ['media'],
      tieneMetaAhorro: [false],
      tieneDeudas: [false]
    });
  }

  ngOnInit(): void {
    // Intentar recuperar datos guardados previamente
    const datosGuardados = this.presupuestoService.obtenerDatosFormulario();
    if (datosGuardados) {
      this.preguntasForm.patchValue(datosGuardados);
    }
  }

  onSubmit(): void {
    if (this.preguntasForm.invalid) {
      this.snackBar.open('Por favor completa todos los campos obligatorios', 'Cerrar', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
      return;
    }

    this.isLoading = true;
    const datos: PresupuestoRequestDto = this.preguntasForm.value;

    // Guardar datos del formulario en localStorage
    this.presupuestoService.guardarDatosFormulario(datos);

    this.presupuestoService.generarPresupuesto(datos).subscribe({
      next: (resultado) => {
        this.isLoading = false;
        // Guardar respuesta para mostrar en pantalla de resultados
        this.presupuestoService.guardarResultado(resultado);
        this.snackBar.open('¡Presupuesto generado exitosamente!', 'Cerrar', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
        this.router.navigate(['/resultados']);
      },
      error: (error) => {
        this.isLoading = false;
        this.snackBar.open(error.error?.message || 'Error al generar el presupuesto', 'Cerrar', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
        console.error('Error al generar presupuesto:', error);
      }
    });
  }
}
