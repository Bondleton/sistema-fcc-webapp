import { Component, Input, OnInit } from '@angular/core';
import { AlumnosService } from '../../services/alumnos.service';
import { Router } from '@angular/router';
declare var $: any; //Para poder usar el jquery

@Component({
  selector: 'app-registro-alumnos',
  templateUrl: './registro-alumnos.component.html',
  styleUrls: ['./registro-alumnos.component.scss']
})
export class RegistroAlumnosComponent implements OnInit {
  @Input() rol: string = "";

  // Variables
  public alumno: any = {};
  public editar: boolean = false;

  public errors: any = {};

  // Variables para las contraseñas
  public hide_1: boolean = false;
  public hide_2: boolean = false;
  public inputType_1: string = 'password';
  public inputType_2: string = 'password';

  constructor(
    private alumnosService: AlumnosService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Definir el esquema a mi JSON
    this.alumno = this.alumnosService.esquemaAlumno();
    this.alumno.rol = this.rol; // Asigna el valor de la propiedad rol del componente (this.rol) a la propiedad rol del objeto maestro.
    console.log("Alumno: ", this.alumno);
  }

  public regresar() {

  }

  public registrar() {
    //Validar
    this.errors = [];

    this.errors = this.alumnosService.validarAlumno(this.alumno, this.editar)
    if (!$.isEmptyObject(this.errors)) {
      return false;
    }

    // Validación
    if (this.alumno.password == this.alumno.confirmar_password) {
      //Aquí si todo es correcto (las contraseñas coinciden) vamos a registrar - aquí se manda a consumir el servicio
      this.alumnosService.registrarAlumno(this.alumno).subscribe(
        (response) => { // si todo sale correcto que nos mande al login
          alert("Usuario registrado correctamente");
          console.log("Usuario registrado: ", response); // agregar el router al constructor
          this.router.navigate(["/"]);
        }, (error) => {
          alert("No se pudo registrar usuario");
        }
      );
    } else {
      alert("Las contraseñas no coinciden"); // lo regresa como vacio
      this.alumno.password = "";
      this.alumno.confirmar_password = "";
    }

  }

  public actualizar() {

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
  public changeFecha(event: any) {
    console.log(event);
    console.log(event.value.toISOString());

    this.alumno.fecha_nacimiento = event.value.toISOString().split("T")[0];
    console.log("Fecha: ", this.alumno.fecha_nacimiento);
  }

}
