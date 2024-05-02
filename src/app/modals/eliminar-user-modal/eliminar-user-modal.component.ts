import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdministradoresService } from 'src/app/services/administradores.service';
import { AlumnosService } from 'src/app/services/alumnos.service';
import { MaestrosService } from 'src/app/services/maestros.service';

@Component({
  selector: 'app-eliminar-user-modal',
  templateUrl: './eliminar-user-modal.component.html',
  styleUrls: ['./eliminar-user-modal.component.scss']
})
export class EliminarUserModalComponent implements OnInit {

  public rol: string = "";

  constructor(
    private administradoresService: AdministradoresService,
    private maestrosService: MaestrosService,
    private alumnosService: AlumnosService,
    private dialogRef: MatDialogRef<EliminarUserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any // json data que trae todos los valores que le pasamos anteriormente
  ) { }

  ngOnInit(): void {
    this.rol = this.data.rol; // Trae el json del otro lado
    console.log("Rol modal: ", this.rol);

  }

  public cerrar_modal() {
    this.dialogRef.close({ isDelete: false });
  }

  public eliminarUser() {
    if (this.rol == "administrador") {
      this.administradoresService.eliminarAdmin(this.data.id).subscribe( // Inovocamos el servicio para los 3 tipos de usuarios
        (response) => {
          console.log(response);
          this.dialogRef.close({ isDelete: true });
        }, (error) => {
          this.dialogRef.close({ isDelete: false });
        }
      );

    } else if (this.rol == "maestro") {
      this.maestrosService.eliminarMaestro(this.data.id).subscribe(
        (response) => {
          console.log(response);
          this.dialogRef.close({ isDelete: true });
        }, (error) => {
          this.dialogRef.close({ isDelete: false });
        }
      );

    } else if (this.rol == "alumno") {
      this.alumnosService.eliminarAlumno(this.data.id).subscribe(
        (response) => {
          console.log(response);
          this.dialogRef.close({ isDelete: true });
        }, (error) => {
          this.dialogRef.close({ isDelete: false });
        }
      );
    }

  }
}
