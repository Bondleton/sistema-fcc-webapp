import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FacadeService } from 'src/app/services/facade.service';
import { MateriasService } from '../../services/materias.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EliminarUserModalComponent } from 'src/app/modals/eliminar-user-modal/eliminar-user-modal.component';

@Component({
  selector: 'app-materias-screen',
  templateUrl: './materias-screen.component.html',
  styleUrls: ['./materias-screen.component.scss']
})
export class MateriasScreenComponent implements OnInit{
  public name_user : string = "";
  public rol : string = "";
  public token : string = "";
  public lista_materias : any[] = [];

  displayedColumns : string[] = ['nrc', 'nombre_materia', 'dias', 'hora_inicio', 'hora_fin', 'salon', 'editar', 'eliminar'];
  dataSource = new MatTableDataSource<DatosUsuario>(this.lista_materias as DatosUsuario[]);

  @ViewChild(MatPaginator) paginator : MatPaginator;

  constructor(
    public facadeService : FacadeService,
    private materiasService : MateriasService,
    private router : Router,
    public dialog : MatDialog
  ){}

  ngOnInit(): void {
    this.name_user = this.facadeService.getUserCompleteName();
    this.rol = this.facadeService.getUserGroup();
    //Validar que haya inicio de sesión
    //Obtengo el token del login
    this.token = this.facadeService.getSessionToken();
    console.log("Token: ", this.token);

    if(this.token == ""){
      this.router.navigate([""]);
    }

    this.obtenerMaterias();
    //Para paginador
    this.initPaginator();
  }

// Paginacion
  public initPaginator(){
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      //console.log("Paginator: ", this.dataSourceIngresos.paginator);
      //Modificar etiquetas del paginador a español
      this.paginator._intl.itemsPerPageLabel = 'Registros por página';
      this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
        if (length === 0 || pageSize === 0) {
          return `0 / ${length}`;
        }
        length = Math.max(length, 0);
        const startIndex = page * pageSize;
        const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
        return `${startIndex + 1} - ${endIndex} de ${length}`;
      };
      this.paginator._intl.firstPageLabel = 'Primera página';
      this.paginator._intl.lastPageLabel = 'Última página';
      this.paginator._intl.previousPageLabel = 'Página anterior';
      this.paginator._intl.nextPageLabel = 'Página siguiente';
    },500);
    //this.dataSourceIngresos.paginator = this.paginator;
  }

  public obtenerMaterias(){
    this.materiasService.obtenerListaMateria().subscribe(
      (response)=>{
        console.log("Respuesta del servicio:", response);
        this.lista_materias = response;
        console.log("Lista materias: ", this.lista_materias);
        if(this.lista_materias.length > 0){
          //Agregar datos del nombre e email
          this.dataSource.data = this.lista_materias;
        }
      }, (error)=>{
        console.log("No se pudo obtener la lista de usuarios", error);
      }
    );
  }

  public goEditar(idUser: number){
    this.router.navigate(["registro-materias/"+idUser]);
  }

  public delete(idUser: number){
    const dialogRef = this.dialog.open(EliminarUserModalComponent,{
      data: {id: idUser, rol: 'materia'}, //Se pasan valores a través del componente
      height: '288px',
      width: '328px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.isDelete){
        console.log("Materia eliminada");
        //Recargar página
        window.location.reload();
      }else{
        alert("Materia no eliminada ");
        console.log("No se eliminó la materia");
      }
    });
  }


}//Cierre de la clase


export interface DatosUsuario {
  nrc: number,
  nombre_materia: string;
  dias: Text;
  hora_inicio: string;
  hora_fin: string,
  salon: string,
  }
