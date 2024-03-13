import { Component, Input, OnInit } from '@angular/core';
import { MaestrosService } from 'src/app/services/maestros.service';
import { MatRadioChange } from '@angular/material/radio';
declare var $: any; //Para poder usar el jquery

@Component({
  selector: 'app-registro-maestros',
  templateUrl: './registro-maestros.component.html',
  styleUrls: ['./registro-maestros.component.scss']
})
export class RegistroMaestrosComponent implements OnInit {
  @Input() rol: string = ""; // el componente puede recibir un valor para esta propiedad desde su componente padre

  // Variables
  public maestro: any = {};
  public editar: boolean = false;
  public errors: any = {};


  // Variables para las contraseñas
  public hide_1: boolean = false;
  public hide_2: boolean = false;
  public inputType_1: string = 'password';
  public inputType_2: string = 'password';

  // Array para materias - checkbox
  public materias: any[] = [
    { value: '1', nombre: 'Aplicaciones Web' },
    { value: '2', nombre: 'Programación 1' },
    { value: '3', nombre: 'Bases de datos' },
    { value: '4', nombre: 'Tecnologías Web' },
    { value: '5', nombre: 'Minería de datos' },
    { value: '6', nombre: 'Desarrollo móvil' },
    { value: '7', nombre: 'Estructuras de datos' },
    { value: '8', nombre: 'Administración de redes' },
    { value: '9', nombre: 'Ingeniería de Software' },
    { value: '10', nombre: 'Administración de S.O.' },
  ];

  constructor(
    private maestrosService: MaestrosService
  ) { }


  ngOnInit(): void {
    //Definir el esquema a mi JSON
    this.maestro = this.maestrosService.esquemaMaestro();
    this.maestro.rol = this.rol; // Asigna el valor de la propiedad rol del componente (this.rol) a la propiedad rol del objeto maestro.
    console.log("Maestro: ", this.maestro);

  }

  public regresar() {

  }

  public registrar() {
    //Validar
    this.errors = [];

    this.errors = this.maestrosService.validarMaestro(this.maestro, this.editar)
    if (!$.isEmptyObject(this.errors)) {
      return false;
    }
    //TODO ejecuta la siguiente línea
  }

  public actualizar() {

  }

  // Para el checkbox
  public checkboxChange(event: any) {
    //console.log("Evento: ", event);
    if (event.checked) {
      this.maestro.materias_json.push(event.source.value)
    } else {
      console.log(event.source.value);
      this.maestro.materias_json.forEach((materia, i) => {
        if (materia == event.source.value) {
          this.maestro.materias_json.splice(i, 1)
        }
      });
    }
    console.log("Array materias: ", this.maestro);
  }

  // Funciones para password
  showPassword() {
    if (this.inputType_1 == 'password') { // Si es tipo contraseña lo oculta
      this.inputType_1 = 'text'; // Si es tipo texto muestralo
      this.hide_1 = true; // si no es pass, es texto
    }
    else {
      this.inputType_1 = 'password';
      this.hide_1 = false;
    }
  }

  showPwdConfirmar() {
    if (this.inputType_2 == 'password') {
      this.inputType_2 = 'text';
      this.hide_2 = true;
    }
    else {
      this.inputType_2 = 'password';
      this.hide_2 = false;
    }
  }

  //Función para detectar el cambio de fecha
  //Para la fecha
  public changeFecha(event: any) { //el evento regresa uno de cualquier tipo
    console.log(event);
    console.log(event.value.toISOString()); // Entremos a la propiedad value, String
    //Se lo asigno a this. La T significa la hora, entonces con split es para dividir cadenas
    this.maestro.fecha_nacimiento = event.value.toISOString().split("T")[0];
    console.log("Fecha: ", this.maestro.fecha_nacimiento);
  }

  // Para el select
  public changeSelect(event: any) {
    console.log(event.value);
    this.maestro.area_investigacion = event.value;
  }

  // Array para áreas de investigación (Mio)
  // public areas: any[] = [
  //   { value: '1', inves: 'Desarrollo Web' },
  //   { value: '2', inves: 'Programación' },
  //   { value: '3', inves: 'Redes' },
  //   { value: '4', inves: 'Matemáticas' },
  // ];

  //Para el select
  public areas: any[] = [
    { value: '1', viewValue: 'Desarrollo Web' },
    { value: '2', viewValue: 'Programación' },
    { value: '3', viewValue: 'Bases de datos' },
    { value: '4', viewValue: 'Redes' },
    { value: '5', viewValue: 'Matemáticas' },
  ];

  // validacion del check box


}
