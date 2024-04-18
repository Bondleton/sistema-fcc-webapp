import { Component, Input, OnInit } from '@angular/core';
import { AdministradoresService } from '../../services/administradores.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FacadeService } from 'src/app/services/facade.service';
import { Location } from '@angular/common';

//Para poder usar el jquery definir la siguiente linea
declare var $: any;

@Component({
  selector: 'app-registro-admin',
  templateUrl: './registro-admin.component.html',
  styleUrls: ['./registro-admin.component.scss']
})
export class RegistroAdminComponent implements OnInit {
  // Decorador Input: permite que los datos fluyan desde el componente padre hacia el componente hijo
  @Input() rol: string = ""; // declara una propiedad rol en el componente RegistroAdminComponent que puede ser recibida como entrada desde su componente padre.
  @Input() datos_user: any = {};  // Datos de usuario como clave

  // Variables
  public admin: any = {};
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
    private administradoresService: AdministradoresService,
    private router: Router,
    private location: Location,
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
      this.admin = this.datos_user;
    } else {
      //Definir el esquema a mi JSON
      this.admin = this.administradoresService.esquemaAdmin();
      this.admin.rol = this.rol;  // Asigna el valor de la propiedad rol del componente (this.rol) a la propiedad rol del objeto admin.
      this.token = this.facadeService.getSessionToken();
    }
    //Imprimir datos en consola
    console.log("Admin: ", this.admin);

  }

  public regresar() {
    this.location.back();
  }

  public registrar() {
    //Validar
    this.errors = [];

    this.errors = this.administradoresService.validarAdmin(this.admin, this.editar)
    if (!$.isEmptyObject(this.errors)) {
      return false;
    }
    //Validamos que las contraseñas coincidan
    //Validar la contraseña
    if (this.admin.password == this.admin.confirmar_password) {
      //Aquí si todo es correcto (las contraseñas coinciden) vamos a registrar - aquí se manda a consumir el servicio
      this.administradoresService.registrarAdmin(this.admin).subscribe(
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
      this.admin.password = "";
      this.admin.confirmar_password = "";
    }

  }

  public actualizar() {
    //Verifica que no haya campos vacios y pasa la validación
    this.errors = [];

    this.errors = this.administradoresService.validarAdmin(this.admin, this.editar);
    if (!$.isEmptyObject(this.errors)) {
      return false;
    }
    console.log("Pasó la validación");

    this.administradoresService.editarAdmin(this.admin).subscribe(
      (response) => {
        alert("Administrador editado correctamente");
        console.log("Admin editado: ", response);
        //Si se editó, entonces mandar al home
        this.router.navigate(["home"]);
      }, (error) => {
        alert("No se pudo editar el administrador");
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

}

/*

NOTAS:

Este es un componente llamado RegistroAdminComponent, el cual
maneja la lógica relacionada con el registro de administradores
de la app.

1. Importación de Component y OnInit: Se importan Component y
OnInit desde @angular/core. Component se utiliza para definir
un nuevo componente Angular, mientras que OnInit es una
interfaz que se implementa para definir un método ngOnInit
que se ejecuta después de que Angular haya inicializado
completamente el componente.

2.Decorador @Component: Se usa para definir metadatos del
componente, como el selector, la plantilla y los estilos.
- selector: Es el nombre del selector de etiqueta HTML que se
 utilizará para instanciar este componente en otras partes de
 la aplicación.
- templateUrl: Es la URL del archivo HTML que contiene la
  plantilla del componente.
- styleUrls: Es un array que contiene las URL de los archivos
 de estilos (hojas de estilo CSS) asociados con este
 componente.
-

3. Clase RegistroAdminComponent: Define la lógica del componente.
- Propiedades públicas: Se definen varias propiedades públicas,
 como admin, editar, errors, hide_1, hide_2, inputType_1 y
 inputType_2, que probablemente se utilizan para almacenar
 datos relacionados con el formulario de registro de
 administradores y para controlar la visibilidad de las
 contraseñas.

- Constructor y ngOnInit(): El constructor está vacío en este
  caso. ngOnInit() no tiene ninguna implementación, ya que está
 vacío.

- Métodos públicos regresar, registrar y actualizar:
  Estos métodos probablemente estarán asociados con acciones
  específicas que el usuario puede realizar en la interfaz de
  registro de administradores, como regresar a una página
  anterior, registrar un nuevo administrador o actualizar la
  información de un administrador existente.

- Métodos showPassword y showPwdConfirmar: Estos métodos
  controlan la visibilidad de las contraseñas.
  Cambian el tipo de entrada (password o text) según la
  visibilidad actual de la contraseña.
-

*/
