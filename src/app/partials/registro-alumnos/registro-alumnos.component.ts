import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AlumnosService } from '../../services/alumnos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FacadeService } from 'src/app/services/facade.service';
declare var $: any; //Para poder usar el jquery

@Component({
  selector: 'app-registro-alumnos',
  templateUrl: './registro-alumnos.component.html',
  styleUrls: ['./registro-alumnos.component.scss']
})
export class RegistroAlumnosComponent implements OnInit {
  // Decorador Input: permite que los datos fluyan desde el componente padre hacia el componente hijo
  @Input() rol: string = "";
  @Input() datos_user: any = {};

  // Variables
  public alumno: any = {};
  public editar: boolean = false;

  public errors: any = {};
  public token: string = "";
  public idUser: Number = 0;

  // Variables para las contraseñas
  public hide_1: boolean = false;
  public hide_2: boolean = false;
  public inputType_1: string = 'password';
  public inputType_2: string = 'password';

  constructor(
    private location: Location,
    private alumnosService: AlumnosService,
    private router: Router,
    public activatedRoute: ActivatedRoute,
    private facadeService: FacadeService
  ) { }

  ngOnInit(): void {
    //El primer if valida si existe un parámetro en la URL
    if (this.activatedRoute.snapshot.params['id'] != undefined) {
      this.editar = true;
      //Asignamos a nuestra variable global el valor del ID que viene por la URL
      this.idUser = this.activatedRoute.snapshot.params['id'];
      console.log("ID User: ", this.idUser);
      //Al iniciar la vista asignamos los datos del user
      this.alumno = this.datos_user;
    } else {
      this.alumno = this.alumnosService.esquemaAlumno();
      this.alumno.rol = this.rol;
      this.token = this.facadeService.getSessionToken();
    }
    //Imprimir datos en consola
    console.log("Alumno: ", this.alumno);
  }

  public regresar() {
    this.location.back();
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
    //Validación de que no hay campos vacios
    this.errors = [];

    this.errors = this.alumnosService.validarAlumno(this.alumno, this.editar);
    if (!$.isEmptyObject(this.errors)) {
      return false;
    }
    console.log("Pasó la validación");

    this.alumnosService.editarAlumno(this.alumno).subscribe(
      (response) => {
        alert("Alumno editado correctamente");
        console.log("Alumno editado: ", response);
        //Si se editó, entonces mandar al home
        this.router.navigate(["home"]);
      }, (error) => {
        alert("No se pudo editar el alumno");
      }
    );
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
