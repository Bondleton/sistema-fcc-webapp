import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorsService {

  public generic: string;
  public required: string;
  public numeric: string;
  public betweenDate: string;
  public email: string;
  public areaRequired: string; // Agrega un mensaje de error para el campo de área de investigación

  constructor() { // Inicializa las propiedades del servicio con mensajes de error predeterminados
    this.generic = 'Favor de verificar el tipo de dato introducido no es válido';
    this.required = 'Campo requerido';
    this.numeric = 'Solo se aceptan valores numéricos';
    this.betweenDate = 'Fecha no es válida';
    this.email = 'Favor de introducir un correo con el formato correcto';
    this.areaRequired = 'Área de investigación es un campo requerido'; // Mensaje de error para el campo de área de investigación
  }

  between(min: any, max: any) { // métodos que devuelven mensajes de error dinámicos basados en parámetros que se les pasan.
    return 'El valor introducido debe de ser entre ' + min + ' y ' + max;
  }

  max(size: any) {
    return 'Se excedió la longitud del campo aceptada: ' + size;
  }

  min(size: any) {
    return 'El campo no cumple la longitud aceptada: ' + size;
  }

  
}


/* Notas

Este es el servicio Angular llamado ErrorsService
que se utiliza para manejar los mensajes de error
en una aplicación.

1. Inyectable y NgModule: decorador que indica que una
clase es un servicio que puede ser inyectado en otros
componentes o servicios.

2. Constructor

3. Métodos between, max y min



*/
