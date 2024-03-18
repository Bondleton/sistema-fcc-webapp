import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ValidatorService } from './tools/validator.service';
import { ErrorsService } from './tools/errors.service';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

//Variables para las cookies
const session_cookie_name = 'sistema-fcc-token';
const user_email_cookie_name = 'sistema-fcc-email';
const user_id_cookie_name = 'sistema-fcc-user_id';
const user_complete_name_cookie_name = 'sistema-fcc-user_complete_name';
const group_name_cookie_name = 'sistema-fcc-group_name';
const codigo_cookie_name = 'sistema-fcc-codigo';


@Injectable({
  providedIn: 'root'
})
export class FacadeService {

  constructor(
    private http: HttpClient,
    public router: Router,
    private cookieService: CookieService,
    private validatorService: ValidatorService,
    private errorService: ErrorsService,
  ) { }

  //Validar login
  //Funcion para validar login
  public validarLogin(username: String, password: String) {
    var data = {
      "username": username,
      "password": password
    }
    console.log("Validando login... ", data);
    let error: any = [];

    if (!this.validatorService.required(data["username"])) {
      error["username"] = this.errorService.required;
    } else if (!this.validatorService.max(data["username"], 40)) {
      error["username"] = this.errorService.max(40);
    }
    else if (!this.validatorService.email(data['username'])) {
      error['username'] = this.errorService.email;
    }

    if (!this.validatorService.required(data["password"])) {
      error["password"] = this.errorService.required;
    }

    return error;
  }

  //Servicios para login y para cerrar sesión
  //Iniciar sesión
  login(username: String, password: String): Observable<any> { // Recibe el lo usuername
    var data = {
      username: username,
      password: password
    }
    return this.http.post<any>(`${environment.url_api}/token/`, data);
  }

  //Cerrar sesión
  logout(): Observable<any> {
    var headers: any;
    var token = this.getSessionToken();
    headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });
    return this.http.get<any>(`${environment.url_api}/logout/`, { headers: headers });
  }

  //Funciones para las cookies y almacenar datos de inicio de sesión
  //Funciones para utilizar las cookies en web
  retrieveSignedUser() {  // Validacion para el token cuando se hace la petición del logeo
    var headers: any;
    var token = this.getSessionToken();
    headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
    return this.http.get<any>(`${environment.url_api}/me/`, { headers: headers });
  }

  getCookieValue(key: string) { // Obtiene todos los valores de las cookies
    return this.cookieService.get(key);
  }

  saveCookieValue(key: string, value: string) { // Guarda las cookies una vez se hace el logeo de infromación
    var secure = environment.url_api.indexOf("https") != -1;
    this.cookieService.set(key, value, undefined, undefined, undefined, secure, secure ? "None" : "Lax");
  }

  getSessionToken() { // Obtiene el token de inicio de sesión
    return this.cookieService.get(session_cookie_name);
  }

  saveUserData(user_data: any) { // Guardar cada uno de los valores cuando es ADMINISTRADOR
    var secure = environment.url_api.indexOf("https") != -1;
    if (user_data.rol == "administrador") {
      this.cookieService.set(user_id_cookie_name, user_data.id, undefined, undefined, undefined, secure, secure ? "None" : "Lax");
      this.cookieService.set(user_email_cookie_name, user_data.email, undefined, undefined, undefined, secure, secure ? "None" : "Lax");
      this.cookieService.set(user_complete_name_cookie_name, user_data.first_name + " " + user_data.last_name, undefined, undefined, undefined, secure, secure ? "None" : "Lax");
    } else {
      this.cookieService.set(user_id_cookie_name, user_data.user.id, undefined, undefined, undefined, secure, secure ? "None" : "Lax");
      this.cookieService.set(user_email_cookie_name, user_data.user.email, undefined, undefined, undefined, secure, secure ? "None" : "Lax");
      this.cookieService.set(user_complete_name_cookie_name, user_data.user.first_name + " " + user_data.user.last_name, undefined, undefined, undefined, secure, secure ? "None" : "Lax");
    }
    this.cookieService.set(session_cookie_name, user_data.token, undefined, undefined, undefined, secure, secure ? "None" : "Lax");
    this.cookieService.set(group_name_cookie_name, user_data.rol, undefined, undefined, undefined, secure, secure ? "None" : "Lax");
  }

  destroyUser() { // Destruir el usuario
    this.cookieService.deleteAll();
  }

  getUserEmail() { // Obtener el email
    return this.cookieService.get(user_email_cookie_name);
  }

  getUserCompleteName() { // Nombre de quien inicio sesion
    return this.cookieService.get(user_complete_name_cookie_name);
  }

  getUserId() { // El id de inicio de sesión
    return this.cookieService.get(user_id_cookie_name);
  }

  getUserGroup() { // A que grupo pertenece, es decir el rol
    return this.cookieService.get(group_name_cookie_name);
  }

}
