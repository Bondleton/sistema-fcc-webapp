import { AdministradoresService } from 'src/app/services/administradores.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';

interface ChartData {
  labels: string[];
  datasets: ChartDataset[];
}

interface ChartDataset {
  data: number[];
  label: string;
  backgroundColor: string | string[];
}

@Component({
  selector: 'app-graficas-screen',
  templateUrl: './graficas-screen.component.html',
  styleUrls: ['./graficas-screen.component.scss'],
})

export class GraficasScreenComponent implements OnInit {

  public data: any = {};

  constructor(
    private administradoresService: AdministradoresService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.obtenerTotalUsuarios();
  }

  // Line Chart
  lineChartData = {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        data: [98, 34, 43, 54, 28, 74, 93],
        label: 'Registro de materias',
        backgroundColor: '#F88406'
      }
    ]
  }

  lineChartOption = {
    responsive: false
  }

  lineChartPlugins = [DatalabelsPlugin];

  // GRAFICA DE PASTEL
  pieChartData: ChartData = {
    labels: ['Administradores', 'Maestros', 'Alumnos'],
    datasets: [
      {
        data: [], // Datos dinámicos irán aquí
        label: 'Registro de usuarios',
        backgroundColor: ['#cdb4db', '#a2d2ff', '#ffee93'],
      },
    ],
  };

  pieChartOption = {
    responsive: true,
    maintainAspectRatio: false,
  };

  pieChartPlugins = [DatalabelsPlugin];

  // GRAFICA DE DONA
  doughnutChartData: ChartData = {
    labels: ['Administradores', 'Maestros', 'Alumnos'],
    datasets: [
      {
        data: [], // Datos dinámicos irán aquí
        label: 'Registro de usuarios',
        backgroundColor: ['#cdb4db', '#a2d2ff', '#ffee93'],
      },
    ],
  };

  doughnutChartOption = {
    responsive: true,
    maintainAspectRatio: false,
  };

  doughnutChartPlugins = [DatalabelsPlugin];

  // Bar Chart
  barChartData: ChartData = {
    labels: ['Administradores', 'Maestros', 'Alumnos'],
    datasets: [
      {
        data: [],
        label: 'Registro de usuarios',
        backgroundColor: ['#cdb4db', '#a2d2ff', '#ffee93'],
      },
    ],
  };

  barChartOption = {
    responsive: false
  }

  barChartPlugins = [DatalabelsPlugin];

  obtenerTotalUsuarios() {
    this.administradoresService.getTotalUsuarios().subscribe({
      next: (data) => {
        console.log('Datos recibidos:', data);
        this.updateChartData(data);
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error al obtener datos de usuarios', error);
      },
    });
  }

  updateChartData(data: any) {
    this.pieChartData.datasets[0].data = [data.admins, data.maestros, data.alumnos];
    this.doughnutChartData.datasets[0].data = [data.admins, data.maestros, data.alumnos];
    this.barChartData.datasets[0].data = [data.admins, data.maestros, data.alumnos];

    this.pieChartData = { ...this.pieChartData };
    this.doughnutChartData = { ...this.doughnutChartData };
    this.barChartData = { ...this.barChartData };
    this.cdr.detectChanges();
  }
}
