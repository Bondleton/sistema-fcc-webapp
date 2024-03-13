import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  constructor() { }

  // *** Funciones para validaciones

  // Verifica si el valor proporcionado no es nulo indefinido, una cadena vacía o una cadena que consiste solo en espacios en blanco.
  required(input: any) {
    return (input != undefined && input != null && input != "" && input.toString().trim().length > 0);
  }

  // Verifican si la longitud es menor o igual (max) o mayor o igual (min) que un tamaño especificado.
  max(input: any, size: any) {
    return (input.length <= size);
  }

  min(input: any, size: any) {
    return (input.length >= size);
  }

  // Verifica si el valor coincide con el formato de correo
  email(input: any) {
    var regEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return input.match(regEx); // Invalid format
  }

  // Verifica si es una fecha válida en formato ISO (AAAA-MM-DD).
  date(input: any) {
    var regEx = /^\d{4}-\d{2}-\d{2}$/;
    if (!input.match(regEx)) return false;  // Invalid format
    var d = new Date(input);
    if (Number.isNaN(d.getTime())) return false; // Invalid date
    return d.toISOString().slice(0, 10) === input;
  }

  // Verifica si está dentro de un rango especificado.
  between(input: any, min: any, max: any) {
    return (max >= input >= min);
  }

  // Verifica si es numerico
  numeric(input: any) {
    return (!isNaN(parseFloat(input)) && isFinite(input));
  }

  // Verifican si el número de decimales en el valor proporcionado es menor o igual (maxDecimals) o mayor o igual (minDecimals) que un tamaño especificado.
  maxDecimals(input: any, size: any) {
    let decimals = 0;

    if (Math.floor(input) !== input && input.toString().split(".")[1]) {
      decimals = input.toString().split(".")[1].length
    }

    return (decimals <= size);
  }

  minDecimals(input: any, size: any) {
    let decimals = 0;

    if (Math.floor(input) !== input && input.toString().split(".")[1]) {
      decimals = input.toString().split(".")[1].length
    }

    return (decimals >= size);
  }

  // Verifica si la fecha proporcionada está dentro de un rango especificado.
  dateBetween(input: any, min: any, max: any) {

    input = new Date(input).getTime();
    min = new Date(min).getTime();
    max = new Date(max).getTime();

    return (max >= input && input >= min);

  }

  // Verifica si el valor proporcionado contiene solo letras y espacios.
  words(input: any) {
    let pat = new RegExp('^([A-Za-zÑñáéíóúÁÉÍÓÚ ]+)$');
    console.log(pat.test(input), input);
    return pat.test(input);
  }
}

/* Notas

Este es otro servicio Angular llamado ValidatorService,
el cual proporciona funciones para validar diferentes tipos
de datos.

1. Inyectable y NgModule: decorador que indica que una
clase es un servicio que puede ser inyectado en otros
componentes o servicios.

2. Definición del servicio ValidatorService: Esta clase
contiene métodos para realizar diversas validaciones de datos.

3. Funciones de validación

*/
