import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var $:any;

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.scss']
})
export class LoginScreenComponent implements OnInit{

  public username: string = "";
  public password: string = "";
  public type: String = "password";

  constructor( //Inyectar el componente
    private router: Router
  ){}

  ngOnInit(): void {

  }

  public login(){

  }

  public registrar(){
    //Llamar a la variable con this.
    this.router.navigate(["registro-usuarios"]); // Le digo "Navega a la ruta que le puse usuarios"
  }

  public showPassword(){
    if(this.type == "password"){
      //Esta funcion muestra la contraseña
      $("#show-password").addClass("show-password");
      $("#show-password").attr("data-password", true);
      this.type = "text";
    }else if(this.type == "text"){
      //Y aqui la va a oculta la contraseña (de nuevo)
      $("#show-password").removeClass("show-password");
      $("#show-password").attr("data-password", false);
      this.type = "password";
    }
  }

}
