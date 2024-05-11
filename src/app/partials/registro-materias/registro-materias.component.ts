import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MateriasService } from '../../services/materias.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FacadeService } from 'src/app/services/facade.service';
declare var $:any;

@Component({
  selector: 'app-registro-materias',
  templateUrl: './registro-materias.component.html',
  styleUrls: ['./registro-materias.component.scss']
})
export class RegistroMateriasComponent implements OnInit{

  @Input() materia: string = "";
  @Input() datos_materia: any = {};


  public materias: any = {};
  public token: string = "";
  public errors:any={};
  public editar:boolean = false;
  public idMat: Number = 0;

  // check


    //Para el select
  public programa_educativo: any[] = [
    {value: '1', viewValue: 'Ingeniería en Ciencias de la Computación'},
    {value: '2', viewValue: 'Licenciatura en Ciencias de la Computación'},
    {value: '3', viewValue: 'Ingeniería en Tecnologías de la Información'},
  ];

  public dias:any[]= [
    {value: '1', nombre: 'Lunes'},
    {value: '2', nombre: 'Martes'},
    {value: '3', nombre: 'Miercoles'},
    {value: '4', nombre: 'Jueves'},
    {value: '5', nombre: 'Viernes'},
    {value: '6', nombre: 'Sabado'},
  ];

  constructor(
    private location : Location,
    private materiasService: MateriasService,
    private router: Router,
    public activatedRoute: ActivatedRoute,
    private facadeService: FacadeService,){}

  ngOnInit(): void {
    //El primer if valida si existe un parámetro en la URL
    if(this.activatedRoute.snapshot.params['id'] != undefined){
      this.editar = true;
      //Asignamos a nuestra variable global el valor del ID que viene por la URL
      this.idMat = this.activatedRoute.snapshot.params['id'];
      console.log("ID materia: ", this.idMat);
      this.getMateriaByID();
      //Al iniciar la vista asignamos los datos del user
      this.materias = this.datos_materia;
    }else{
      this.materias = this.materiasService.esquemaMateria();
      this.token = this.facadeService.getSessionToken();
    }
    //Imprimir datos en consola
    console.log("Materia: ", this.materias);

  }

  public regresar(){
    this.location.back();
  }

  public registrar(){
    //validar
    this.errors = [];

    this.errors = this.materiasService.validarMateria(this.materias, this.editar);
    if(!$.isEmptyObject(this.errors)){
      console.log("Error en el formulario")
      return false;
    }

          //Vamos a consumir el servicoi de registrar materia
      //Si todo es correcto se registra/se llama al servicio
      this.materiasService.registrarMateria(this.materias).subscribe(
        (response)=>{
          alert("Materia registrada correctamente")
          console.log("Materia registrado: ", response);
          this.location.back();
        }, (error)=>{
          alert("No se pudo registrar materia");
          console.log("Error al realizar registro: ", error)
        }
        );


    this.errors = this.materiasService.validarMateria(this.materias, this.editar);
    if(!$.isEmptyObject(this.errors)){
      return false;
    }


  }

  public actualizar(){
    //Validación
    this.errors = [];

    this.errors = this.materiasService.validarMateria(this.materias, this.editar);
    if(!$.isEmptyObject(this.errors)){
      return false;
    }
    console.log("Pasó la validación");

    this.materiasService.editarMateria(this.materias).subscribe(
      (response)=>{
        alert("Materia editado correctamente");
        console.log("Materia editado: ", response);
        //Si se editó, entonces mandar al home
        this.router.navigate(["home"]);
      }, (error)=>{
        alert("No se pudo editar la materia");
      }
    );
  }

  public checkboxChange(event:any){
    console.log("Evento: ", event);
    if(event.checked){
      this.materias.dias.push(event.source.value)
    }else{
      console.log(event.source.value);
      this.materias.dias.forEach((dia, i) => {
        if(dia == event.source.value){
          this.materias.dias.splice(i,1);
        }
      });
    }
    console.log("Array dias: ", this.materia);
  }

  public revisarSeleccion(nombre: string){
    if(this.materias.dias){
      var busqueda = this.materias.dias.find((element)=>element==nombre);
      if(busqueda != undefined){
        return true;
      }else{
        return false;
      }
    }else{
      return false;
    }
  }

  public getMateriaByID(){
    console.log("Obteniendo datos de la materia...", this.idMat); // Corregido: accedemos a idMat
    this.materiasService.getMateriaByID(this.idMat).subscribe(
      (response) => {
        console.log("Datos de la materia: ", response);
        this.materias = response; // Corregido: asignamos response a materias
        // Parse the string into an array
        if (typeof this.materias.dias === 'string') {
          this.materias.dias = JSON.parse(this.materias.dias.replace(/'/g, '"'));
        }
        console.log("Array de dias: ", this.materias.dias);
      },
      (error) => {
        alert("Error al obtener los datos de la materia para editar");
        console.log("Error: ", error);
      }
    )
  }


}
