import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ValidatorService } from './tools/validator.service';
import { ErrorsService } from './tools/errors.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MaestrosService {

  constructor(
    private http: HttpClient,
    private validatorService: ValidatorService,
    private errorService: ErrorsService,
    // private facadeService: FacadeService
  ) { }

  public esquemaMaestro() {
    return {
      'rol': '', // Representa el rol del maestro
      'clave_maestro': '', // Representa la clave única del maestro.
      'first_name': '', // Representa el nombre del maestro.
      'last_name': '', // Representa el apellido del maestro.
      'email': '', // Representa la dirección de correo electrónico del maestro.
      'password': '', // Representa la contraseña del maestro.
      'confirmar_password': '', // Representa la confirmación de la contraseña del maestro.
      'telefono': '', // Representa el número de teléfono del maestro.
      'rfc': '', // Representa el RFC del maestro.
      'edad': '', // Representa la edad del maestro.
      'fecha_na': '', // Representa fecha de nacimiento del maestro.
      'cubiculo': '',  // Representa el cubículo del maestro.
      'area': '',  // Representa el area de investigacion del maestro.
      'materias_json': [] //Inicializar como array vacio
    }
  }

  //Validación para el formulario
  public validarMaestro(data: any, editar: boolean) { // data: Es un objeto que contiene los datos del maestro que se van a validar.
    console.log("Validando maestro... ", data); // editar : booleando que indica si se esta editando un maestro existente o uno nuevo
    let error: any = [];

    if (!this.validatorService.required(data["clave_maestro"])) {
      error["clave_maestro"] = this.errorService.required;
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

    if (!this.validatorService.required(data["fecha_na"])) {
      error["fecha_na"] = this.errorService.required;
    }

    if (!this.validatorService.required(data["cubiculo"])) {
      error["cubiculo"] = this.errorService.required;
    }

    // if (!this.validatorService.required(data["area"])) {
    //   error["area"] = this.errorService.required;
    // } (Mio)

    if (!this.validatorService.required(data["area_investigacion"])) {
      error["area_investigacion"] = this.errorService.required;
    }

    // validacion para el checkbox
    if (data["materias_json"].length == 0) { // si aun no se lecciona nada, es decir las casillas elegidas son 0, manda un alert
      error["materias_json"] = "Al menos debes elegir una materia";
      //alert("Debes seleccionar materias para poder registrarte.");
    }

    //Return arreglo
    return error;  // se almacena en el objeto "error"
  }



}
