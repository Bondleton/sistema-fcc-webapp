import { Component, OnInit } from '@angular/core';
import { AdministradoresService } from '../../services/administradores.service';
import { FacadeService } from 'src/app/services/facade.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-screen',
  templateUrl: './admin-screen.component.html',
  styleUrls: ['./admin-screen.component.scss']
})
export class AdminScreenComponent implements OnInit {

  // Arreglo que va obtener el array de admins
  public name_user: string = "";
  public lista_admins: any[] = [];

  constructor(
    public facadeService: FacadeService, // Lo vamos a usar en las funciones: las cookies
    private administradoresService: AdministradoresService,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.name_user = this.facadeService.getUserCompleteName(); // Preguntar cual es el nombre del usuario
    //Lista de admins
    this.obtenerAdmins();

    //this.initPaginator();
  }

  //Obtener lista de usuarios
  public obtenerAdmins() {
    this.administradoresService.obtenerListaAdmins().subscribe(
      (response) => {
        this.lista_admins = response;
        console.log("Lista users: ", this.lista_admins);
      }, (error) => {
        alert("No se pudo obtener la lista de admins");
      }
    );
  }



  //Funcion para editar
  public goEditar(idUser: number) {
    this.router.navigate(["registro/" + idUser]);
  }

  public delete(idUser: number) {

  }

}
