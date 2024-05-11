import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FacadeService } from 'src/app/services/facade.service';
import { Location } from '@angular/common';
import { MateriasService } from 'src/app/services/materias.service';

@Component({
  selector: 'app-registro-materias-screen',
  templateUrl: './registro-materias-screen.component.html',
  styleUrls: ['./registro-materias-screen.component.scss']
})
export class RegistroMateriasScreenComponent implements OnInit{

  public tipo:string = "registro-materias";
  //JSON para las materias
  public materia:any ={};
  public isUpdate:boolean = false;
  public errors:any = {};
  public editar: boolean = false;

  constructor(
    private location : Location,
    public activatedRoute: ActivatedRoute,
    private router: Router,
    private facadeService: FacadeService,
    private materiasService: MateriasService,
  ){}

  ngOnInit(): void {

    this.materia = this.materiasService.esquemaMateria();

      // Get the materia id from the URL
      if(this.activatedRoute.snapshot.params['id'] != undefined){
        this.editar = true;
        this.materia.id = this.activatedRoute.snapshot.params['id'];
        console.log("ID de la materia a editar: ", this.materia.id);
        this.getMateriaByID();
      }

  }

  public getMateriaByID(){
  console.log("Obteniendo datos de la materia...", this.materia.id);
      this.materiasService.getMateriaByID(this.materia.id).subscribe(
        (response) => {
          console.log("Datos de la materia: ", response);
          this.materia = response;
          // Parse the string into an array
          if (typeof this.materia.dias === 'string') {
            this.materia.dias = JSON.parse(this.materia.dias.replace(/'/g, '"'));
          }
          console.log("Array de dias: ", this.materia.dias);
        }, (error) => {
          alert("Error al obtener los datos de la materia para editar");
          console.log("Error: ", error);
        }
      )
    }
}
