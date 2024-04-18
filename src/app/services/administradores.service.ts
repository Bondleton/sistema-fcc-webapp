import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ValidatorService } from './tools/validator.service';
import { ErrorsService } from './tools/errors.service';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { FacadeService } from './facade.service';

//Crear una constante
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class AdministradoresService {

  constructor( // A todo lo que esta aqui adentro se le llama inyección
    private http: HttpClient,
    private validatorService: ValidatorService,
    private errorService: ErrorsService,
    private facadeService: FacadeService
  ) { }

  public esquemaAdmin() {
    return {
      'rol': '', // Representa el rol del administrador.
      'clave_admin': '', // Representa la clave única del administrador.
      'first_name': '', // Representa el nombre del administrador.
      'last_name': '', // Representa el apellido del administrador.
      'email': '', // Representa la dirección de correo electrónico del administrador.
      'password': '', // Representa la contraseña del administrador.
      'confirmar_password': '', // Representa la confirmación de la contraseña del administrador.
      'telefono': '', // Representa el número de teléfono del administrador.
      'rfc': '', // Representa el RFC del administrador.
      'edad': '', // Representa la edad del administrador.
      'ocupacion': '' // Representa la ocupación o cargo del administrador.
    }
  }


  //Validación para el formulario
  public validarAdmin(data: any, editar: boolean) { // data: Es un objeto que contiene los datos del administrador que se van a validar.
    console.log("Validando admin... ", data); // editar : booleando que indica si se esta editando un admin existente o uno nuevo
    let error: any = [];

    if (!this.validatorService.required(data["clave_admin"])) {
      error["clave_admin"] = this.errorService.required;
    }

    if (!this.validatorService.required(data["first_name"])) {
      error["first_name"] = this.errorService.required;
    }

    if (!this.validatorService.required(data["last_name"])) {
      error["last_name"] = this.errorService.required;
    }

    if (!this.validatorService.required(data["email"])) {
      error["email"] = this.errorService.required;
    } else if (!this.validatorService.max(data["email"], 40)) {
      error["email"] = this.errorService.max(40);
    } else if (!this.validatorService.email(data['email'])) {
      error['email'] = this.errorService.email;
    }

    if (!editar) {
      if (!this.validatorService.required(data["password"])) {
        error["password"] = this.errorService.required;
      }

      if (!this.validatorService.required(data["confirmar_password"])) {
        error["confirmar_password"] = this.errorService.required;
      }
    }

    if (!this.validatorService.required(data["rfc"])) {
      error["rfc"] = this.errorService.required;
    } else if (!this.validatorService.min(data["rfc"], 12)) {
      error["rfc"] = this.errorService.min(12);
      alert("La longitud de caracteres deL RFC es menor, deben ser 12");
    } else if (!this.validatorService.max(data["rfc"], 13)) {
      error["rfc"] = this.errorService.max(13);
      alert("La longitud de caracteres deL RFC es mayor, deben ser 13");
    }

    if (!this.validatorService.required(data["edad"])) {
      error["edad"] = this.errorService.required;
    } else if (!this.validatorService.numeric(data["edad"])) {
      alert("El formato es solo números");
    }

    if (!this.validatorService.required(data["telefono"])) {
      error["telefono"] = this.errorService.required;
    }

    if (!this.validatorService.required(data["ocupacion"])) {
      error["ocupacion"] = this.errorService.required;
    }

    //Return arreglo
    return error;  // se almacena en el objeto "error"
  }

  //Aquí van los servicios HTTP
  //Servicio para registrar un nuevo usuario
  public registrarAdmin(data: any): Observable<any> {
    return this.http.post<any>(`${environment.url_api}/admin/`, data, httpOptions);
  }

  public obtenerListaAdmins(): Observable<any> {
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });
    return this.http.get<any>(`${environment.url_api}/lista-admins/`, { headers: headers });
  }

  // Función para obtener un usuario y filtrar por ID
  //Obtener un solo usuario dependiendo su ID
  public getAdminByID(idUser: Number) {
    return this.http.get<any>(`${environment.url_api}/admin/?id=${idUser}`, httpOptions);
  }

  //Servicio para actualizar un usuario
  public editarAdmin(data: any): Observable<any> {
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });
    return this.http.put<any>(`${environment.url_api}/admins-edit/`, data, { headers: headers });
  }



}

/*

NOTAS:

Este es un servicio llamado AdministradoresService
responsable de realizar operaciones relacionadas con los
administradores, como recuperar, crear, actualizar o eliminar
administradores en la aplicación.

1. Importación de módulos y servicios:
- HttpClient: Se importa desde @angular/common/http.
  HttpClient es un módulo que proporciona funcionalidades
  para realizar solicitudes HTTP en Angular.

- Injectable: Se importa desde @angular/core.
  Injectable es un decorador que se utiliza para marcar una
  clase como un servicio inyectable en otros componentes o
  servicios.

- ValidatorService y ErrorsService: Se importan desde los
  archivos locales validator.service y errors.service,
  respectivamente. Estos parecen ser servicios personalizados
  que se utilizan para realizar validaciones y manejar
  errores en la aplicación.
-

2. Decorador @Injectable: Se utiliza para marcar la clase
 AdministradoresService como un servicio inyectable en otros
 componentes o servicios.
 El argumento providedIn: 'root' especifica que este servicio
 se proporcionará en el nivel raíz de la aplicación, lo que
 significa que estará disponible en toda la aplicación sin
 necesidad de importarlo explícitamente en ningún módulo.
-

3. Constructor: Se define un constructor para la clase
AdministradoresService, que recibe instancias de HttpClient,
ValidatorService y ErrorsService. Estas instancias se
utilizarán dentro del servicio para realizar solicitudes HTTP
y realizar validaciones y manejo de errores.

- http: Se utiliza para realizar solicitudes HTTP para
  interactuar con un servidor remoto y realizar operaciones
  CRUD en administradores u otros recursos.

- ValidatorService: Se utiliza para realizar validaciones
  de datos, como validar campos de entrada en formularios.

- ErrorsService: Se utiliza para manejar mensajes de error y
  facilitar la comunicación de errores en la aplicación.

-

4. Método esquemaAdmin(): Este método define y devuelve un
  objeto que representa el esquema o el modelo de datos de un
  administrador en la aplicación.

  Propósito: Este método proporciona una forma de obtener un
  esquema predefinido para un administrador en la aplicación.
  Es útil cuando se necesita inicializar o definir un nuevo
  objeto de administrador con propiedades predeterminadas,
  como al crear un nuevo formulario de registro de
  administrador o al editar un administrador existente.

  Acceso público: Al declarar el método como public,
  se garantiza que el método esquemaAdmin() sea accesible
  desde fuera de la clase AdministradoresService, lo que
  significa que otros componentes o servicios en la aplicación
  pueden llamar a este método para obtener el esquema de un
  administrador.
-

5. Método validarAdmin(data: any, editar: boolean):
Este método recibe dos parámetros:
- data: Es un objeto que contiene los datos del administrador
  que se van a validar. Estos datos probablemente se obtienen
  de un formulario donde un usuario está ingresando información
  sobre un administrador.

- editar: Es un booleano que indica si se está editando un
  administrador existente o creando uno nuevo. Esto afecta
  las validaciones que se realizan, especialmente en campos
  como la contraseña, que pueden ser opcionales al editar un
  administrador pero obligatorias al crear uno nuevo.

-Validación de datos: El método realiza una serie de
validaciones en los datos del administrador, verificando
que se cumplan ciertos criterios. Por ejemplo:

Se verifica que campos como clave_admin, first_name,
last_name, email, password, confirmar_password, rfc, edad,
telefono y ocupacion no estén vacíos (required).

Se verifican ciertas condiciones adicionales, como la
longitud máxima de ciertos campos (max), la longitud mínima
de otros (min), el formato correcto de un correo electrónico
(email), y si un campo numérico contiene solo números
(numeric).

6. Manejo de errores: Si se encuentra algún error durante
  la validación, se almacena en un objeto error.
  Cada propiedad de este objeto corresponde a un campo del
  formulario que ha fallado en la validación, y su valor es
  el mensaje de error correspondiente.
-

7. Retorno de errores: Finalmente, el método devuelve
el objeto error, que contiene los mensajes de error para
cada campo que no ha pasado la validación. Esto permite a
otros componentes o servicios en la aplicación mostrar
mensajes de error apropiados al usuario para corregir
los campos incorrectos en el formulario.



*/
