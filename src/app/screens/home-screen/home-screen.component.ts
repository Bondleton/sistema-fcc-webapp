import { Component, OnInit } from '@angular/core';
import { FacadeService } from '../../services/facade.service';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.scss']
})
export class HomeScreenComponent implements OnInit{
  public rol: string = "";

  constructor(
    private facadeService: FacadeService

  ){}

  ngOnInit(): void { // A la variable rol automaticamente entra a las cookies y regresa el userGroup
    this.rol = this.facadeService.getUserGroup();
    console.log("Rol: ", this.rol);
  }

}
