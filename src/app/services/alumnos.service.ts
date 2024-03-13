import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ValidatorService } from './tools/validator.service';
import { ErrorsService } from './tools/errors.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  constructor(
    private http: HttpClient,
    private validatorService: ValidatorService,
    private errorService: ErrorsService,
    // private facadeService: FacadeService
  ) { }

  public esquemaAlumno() {
    return {
      'rol': '', // Representa el rol del alumno
      'clave_alumno': '', // Representa la clave única del alumno.
      'first_name': '', // Representa el nombre del alumno.
      'last_name': '', // Representa el apellido del alumno.
      'email': '', // Representa la dirección de correo electrónico del alumno.
      'password': '', // Representa la contraseña del alumno.
      'confirmar_password': '', // Representa la confirmación de la contraseña del alumno.
      'telefono': '', // Representa el número de teléfono del alumno.
      'rfc': '', // Representa el RFC del alumno.
      'edad': '', // Representa la edad del alumno.
      'fecha_na': '', // Representa fecha de nacimiento del alumno.
      'curp': '',  // Representa el curp de investigacion del alumno.
      'ocupacion': '' // Representa la ocupación o cargo del alumno.
    }
  }

  //Validación para el formulario
  public validarAlumno(data: any, editar: boolean) { // data: Es un objeto que contiene los datos del alumno que se van a validar.
    console.log("Validando alumno... ", data); // editar : booleando que indica si se esta editando un alumno existente o uno nuevo
    let error: any = [];

    if (!this.validatorService.required(data["clave_alumno"])) {
      error["clave_alumno"] = this.errorService.required;
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

    if (!this.validatorService.required(data["curp"])) {
      error["curp"] = this.errorService.required;
    } else if (!this.validatorService.min(data["curp"], 18)) {
      error["curp"] = this.errorService.min(18);
      alert("La longitud de caracteres de la CURP es menor, deben ser 18");
    } else if (!this.validatorService.max(data["curp"], 18)) {
      error["curp"] = this.errorService.max(18);
      alert("La longitud de caracteres de la CURP es mayor, deben ser 18");
    }

    if (!this.validatorService.required(data["ocupacion"])) {
      error["ocupacion"] = this.errorService.required;
    }

    //Return arreglo
    return error;  // se almacena en el objeto "error"
  }
}
