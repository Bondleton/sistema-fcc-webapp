import { Component, OnInit } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { ActivatedRoute, Router } from '@angular/router';
import { AdministradoresService } from 'src/app/services/administradores.service';
import { AlumnosService } from 'src/app/services/alumnos.service';
import { FacadeService } from 'src/app/services/facade.service';
import { MaestrosService } from 'src/app/services/maestros.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-registro-screen',
  templateUrl: './registro-screen.component.html',
  styleUrls: ['./registro-screen.component.scss']
})
export class RegistroScreenComponent implements OnInit { // Importnate poner el Implements

  //Decorador para definir de que tipo es
  public tipo: string = "registro-usuarios"; //Cadena inicializada. le asigno la cadena registro usuarios
  // JSON para los usuarios (admin, maestros, alumnos)
  public user: any = {}; // es de tipo json, y va a regresar cualquier tipo

  public isUpdate: boolean = false;
  public errors: any = {};

  // Crear las banderas para los tipos de usuarios para el radiochange
  public isAdmin: boolean = false;
  public isAlumno: boolean = false;
  public isMaestro: boolean = false;
  public editar: boolean = false;
  public tipo_user: string = "";

  //Info del usuario
  public idUser: Number = 0;
  public rol: string = ""; // que vamos a cachar

  constructor(
    private location: Location,
    public activatedRoute: ActivatedRoute,
    private router: Router,
    private facadeService: FacadeService,
    private administradoresService: AdministradoresService,
    private maestrosService: MaestrosService,
    private alumnosService: AlumnosService
  ) { }

  ngOnInit(): void {
    //Obtener de la URL el rol para saber cual editar
    if (this.activatedRoute.snapshot.params['rol'] != undefined) {
      this.rol = this.activatedRoute.snapshot.params['rol']; // Si el rol exite, lo cacha y manda a imprimir a consola
      console.log("Rol detect: ", this.rol);
    }
    //El if valida si existe un parámetro (id) en la URL
    if (this.activatedRoute.snapshot.params['id'] != undefined) { // Si la url tiene id, activa la bandera editar
      this.editar = true;
      //Asignamos a nuestra variable global el valor del ID que viene por la URL
      this.idUser = this.activatedRoute.snapshot.params['id'];
      console.log("ID User: ", this.idUser);
      //Al iniciar la vista obtiene el usuario por su ID
      this.obtenerUserByID(); // Manda a traer la funcion para obtener el id
    }

  }

  //Función para obtener un solo usuario por su ID
  public obtenerUserByID() {
    if (this.rol == "administrador") {
      this.administradoresService.getAdminByID(this.idUser).subscribe(
        (response) => { // response, trae la respuesta del user
          this.user = response; // Trae todo el objeto JSON
          //Agregamos valores faltantes
          this.user.first_name = response.user.first_name;
          this.user.last_name = response.user.last_name;
          this.user.email = response.user.email;
          this.user.tipo_usuario = this.rol; // llave para que obtenga el rol
          this.isAdmin = true; // Activa el formulario correspondiente de acuerdo al radiochange
          //this.user.fecha_nacimiento = response.fecha_nacimiento.split("T")[0];
          console.log("Datos user: ", this.user);
        }, (error) => {
          alert("No se pudieron obtener los datos del usuario para editar");
        }
      );
    } else if (this.rol == "maestro") {
      this.maestrosService.getMaestroByID(this.idUser).subscribe(
        (response) => {
          this.user = response;
          //Agregamos valores faltantes
          this.user.first_name = response.user.first_name;
          this.user.last_name = response.user.last_name;
          this.user.email = response.user.email;
          this.user.tipo_usuario = this.rol;
          this.isMaestro = true;
          console.log("Datos maestro: ", this.user);
        }, (error) => {
          alert("No se pudieron obtener los datos del usuario para editar");
        }
      );
    } else if (this.rol == "alumno") { // TODO: agrege la s
      this.alumnosService.getAlumnoByID(this.idUser).subscribe(
        (response) => {
          this.user = response;
          //Agregamos valores faltantes
          this.user.first_name = response.user.first_name;
          this.user.last_name = response.user.last_name;
          this.user.email = response.user.email;
          this.user.tipo_usuario = this.rol;
          this.isAlumno = true;
          console.log("Datos alumno: ", this.user);
        }, (error) => {
          alert("No se pudieron obtener los datos del usuario para editar");
        }
      );
    }
  }

  public radioChange(event: MatRadioChange) { //cotrol + . para agragar la auto importacion

    //console.log(event);
    if (event.value == "administrador") { // si el valor del eventos es adminsitrador, apaga las demas opciones
      this.isAdmin = true;
      this.tipo_user = "administrador"
      this.isAlumno = false;
      this.isMaestro = false;
    } else if (event.value == "alumno") {
      this.isAdmin = false;
      this.isAlumno = true;
      this.tipo_user = "alumno"
      this.isMaestro = false;
    } else if (event.value == "maestro") {
      this.isAdmin = false;
      this.isAlumno = false;
      this.isMaestro = true; //enciende la bandera de maestro
      this.tipo_user = "maestro"
    }
  }

}
