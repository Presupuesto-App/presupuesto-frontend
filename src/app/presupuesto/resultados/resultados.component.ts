import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar } from '@angular/material/snack-bar';

import { NgChartsModule } from 'ng2-charts';
import { Chart, ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { default as Annotation } from 'chartjs-plugin-annotation';

import { PresupuestoService } from '../presupuesto.service';
import { PresupuestoResponseDto, SubcategoriaPresupuesto } from '../../shared/models/presupuesto-response.dto';

@Component({
  selector: 'app-resultados',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatDividerModule,
    NgChartsModule
  ],
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent implements OnInit {
  presupuesto: PresupuestoResponseDto | null = null;

  // Configuración para la tabla Material
  displayedColumns: string[] = ['nombre', 'porcentaje', 'monto'];
  dataSource = new MatTableDataSource<SubcategoriaPresupuesto>([]);

  // Configuración para el gráfico circular
  public pieChartType: ChartType = 'pie';
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.raw as number;
            return `${label}: ${value}%`;
          }
        }
      }
    }
  };

  public pieChartData: ChartData<'pie', number[], string> = {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: [
        '#3F51B5', // indigo
        '#2196F3', // blue
        '#00BCD4', // cyan
        '#009688', // teal
        '#4CAF50', // green
        '#8BC34A', // light green
        '#CDDC39', // lime
        '#FFEB3B', // yellow
        '#FFC107', // amber
        '#FF9800', // orange
      ]
    }]
  };

  constructor(
    private presupuestoService: PresupuestoService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    Chart.register(Annotation);
  }

  ngOnInit(): void {
    this.cargarResultados();
  }

  cargarResultados(): void {
    this.presupuesto = this.presupuestoService.obtenerResultado();

    if (!this.presupuesto || !this.presupuesto.subcategorias || this.presupuesto.subcategorias.length === 0) {
      this.snackBar.open('No se encontraron resultados. Completa el formulario primero.', 'Cerrar', {
        duration: 3000
      });
      this.router.navigate(['/preguntas']);
      return;
    }

    // Configurar tabla
    this.dataSource.data = this.presupuesto.subcategorias;

    // Configurar gráfico circular
    this.actualizarGrafico(this.presupuesto.subcategorias);
  }

  actualizarGrafico(subcategorias: SubcategoriaPresupuesto[]): void {
    this.pieChartData.labels = subcategorias.map(item => item.nombre);
    this.pieChartData.datasets[0].data = subcategorias.map(item => item.porcentaje);
  }

  calcularTotal(): number {
    if (!this.presupuesto?.subcategorias) return 0;
    return this.presupuesto.subcategorias.reduce((sum, item) => sum + item.monto, 0);
  }

  volverAPreguntas(): void {
    this.router.navigate(['/preguntas']);
  }
}
