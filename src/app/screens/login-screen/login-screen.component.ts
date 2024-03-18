import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FacadeService } from '../../services/facade.service';
declare var $: any;

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.scss']
})
export class LoginScreenComponent implements OnInit {

  public username: string = "";
  public password: string = "";
  public type: String = "password";
  public errors: any = {};

  constructor(
    private router: Router,
    private facadeService: FacadeService
  ) { }

  ngOnInit(): void {

  }

  public login() {
    //Validar
    this.errors = [];

    this.errors = this.facadeService.validarLogin(this.username, this.password);
    if (!$.isEmptyObject(this.errors)) {
      return false;
    }
    //Si pasa la validación ir a la página de home
    this.facadeService.login(this.username, this.password).subscribe(
      (response) => {
        this.facadeService.saveUserData(response); // svaeUserData: guarda los datos en las cookies
        this.router.navigate(["home"]);
      }, (error) => {
        alert("No se pudo iniciar sesión");
      }
    );

  }

  public registrar() {
    //Llamar a la variable con this.
    this.router.navigate(["registro-usuarios"]); // Le digo "Navega a la ruta que le puse usuarios"
  }

  public showPassword() {
    if (this.type == "password") {
      //Muestra la contraseña
      $("#show-password").addClass("show-password");
      $("#show-password").attr("data-password", true);
      this.type = "text";
    } else if (this.type == "text") {
      //Oculta la contraseña
      $("#show-password").removeClass("show-password");
      $("#show-password").attr("data-password", false);
      this.type = "password";
    }

  }
}
