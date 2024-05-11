import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FacadeService } from './facade.service';
import { ErrorsService } from './tools/errors.service';
import { ValidatorService } from './tools/validator.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class MateriasService {

  constructor(
    private http: HttpClient,
    private validatorService: ValidatorService,
    private errorService: ErrorsService,
    private facadeService: FacadeService
  ) { }

  public esquemaMateria(){
    return {
      'nrc' : '',
      'nombre_materia' : '',
      'seccion' : '',
      'dias' : [],
      'hora_inicio' : '',
      'hora_fin' : '',
      'salon' : '',
      'programa_educativo' : '',
    }
  }

  // VALIDACIONES PARA EL FORMULARIO

  public validarMateria(data: any, editar: boolean){
    console.log("Validando materia...", data)
    let error: any = [];
  // VALIDA QUE ESTE LLENO Y QUE SEA NUMERICO
    if(!this.validatorService.required(data["nrc"])){
      error["nrc"] = this.errorService.required;
    }else if(!this.validatorService.numeric(data["nrc"])){
      error["nrc"] = this.errorService.numeric;
    }
// VALIDA QUE ESTE LLENO
    if(!this.validatorService.required(data["nombre_materia"])){
      error["nombre_materia"] = this.errorService.required;
    }
  // VALIDA QUE ESTE LLENO Y QUE SEA NUMERICO
  if(!this.validatorService.required(data["seccion"])){
    error["seccion"] = this.errorService.required;
  }else if(!this.validatorService.numeric(data["seccion"])){
    error["seccion"] = this.errorService.numeric;
  }
// VALIDA QUE SE ESCOGA AL MENOS UNO
  if(data["dias"].length == 0){
    error["dias"] = "Al menos debes elegir un día";
  }
  // VALIDA QUE ESTE LLENO
  if(!this.validatorService.required(data["hora_inicio"])){
    error["hora_inicio"] = this.errorService.required;
  }
  // VALIDA QUE ESTE LLENO
  if(!this.validatorService.required(data["hora_fin"])){
    error["hora_fin"] = this.errorService.required;
  }
  // VALIDA QUE ESTE LLENO
  if(!this.validatorService.required(data["salon"])){
    error["salon"] = this.errorService.required;
  }

  // VALIDA QUE ESTE LLENO
  if(!this.validatorService.required(data["programa_educativo"])){
    error["programa_educativo"] = this.errorService.required;
  }

  return error;

  }


    //Aquí van los servicios HTTP
  //Servicio para registrar un nuevo usuario en este caso materia
  public registrarMateria (data: any): Observable <any>{
    return this.http.post<any>(`${environment.url_api}/materias/`,data, httpOptions);
  }

  public obtenerListaMateria (): Observable <any>{
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
    return this.http.get<any>(`${environment.url_api}/lista-materias/`, {headers:headers});
  }


    //Funcion para obtener la materia con su ID
    public getMateriaByID(idUser: Number){
      return this.http.get<any>(`${environment.url_api}/materias/?id=${idUser}` ,httpOptions);
    }

      //Funcion para editar
  public editarMateria (data: any): Observable <any>{
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
    return this.http.put<any>(`${environment.url_api}/materias-edit/`, data, {headers:headers});
  }

  // Funcion para eliminar materia
  public eliminarMateria(idUser: number): Observable <any>{
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
    return this.http.delete<any>(`${environment.url_api}/materias-edit/?id=${idUser}`, {headers:headers});
  }

}
