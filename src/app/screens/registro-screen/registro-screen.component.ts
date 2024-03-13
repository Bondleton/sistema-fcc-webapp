import { Component, OnInit } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';

@Component({
  selector: 'app-registro-screen',
  templateUrl: './registro-screen.component.html',
  styleUrls: ['./registro-screen.component.scss']
})
export class RegistroScreenComponent implements OnInit { // Importnate poner el Implements

  public tipo:string = "registro-usuarios"; //Cadena inicializada. le asigno la cadena registro usuarios
  public user:any = {}; // es de tipo json, y va a regresar cualquier tipo

  // Crear las banderas para los tipos de usuarios
  public isAdmin:boolean = false;
  public isAlumno:boolean = false;
  public isMaestro:boolean = false;
  public tipo_user:string= "";



  constructor(){}

  ngOnInit(): void {

  }

  public radioChange(event: MatRadioChange) { //cotrol + . para agragar la auto importacion

    //console.log(event);
    if(event.value == "administrador"){ // si el valor del eventos es adminsitrador, apaga las demas opciones
      this.isAdmin = true;
      this.tipo_user = "administrador"
      this.isAlumno = false;
      this.isMaestro = false;
    }else if (event.value == "alumno"){
      this.isAdmin = false;
      this.isAlumno = true;
      this.tipo_user = "alumno"
      this.isMaestro = false;
    }else if (event.value == "maestro"){
      this.isAdmin = false;
      this.isAlumno = false;
      this.isMaestro = true; //enciende la bandera de maestro
      this.tipo_user = "maestro"
    }
  }

}
