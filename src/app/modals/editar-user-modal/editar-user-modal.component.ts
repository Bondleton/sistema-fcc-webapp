import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-editar-user-modal',
  templateUrl: './editar-user-modal.component.html',
  styleUrls: ['./editar-user-modal.component.scss']
})
export class EditarUserModalComponent{
  public rol: string = "";
  public flag: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<EditarUserModalComponent>,
    @Inject (MAT_DIALOG_DATA) public data: any
  ){}

  ngOnInit(): void {
    this.rol = this.data.rol;
    console.log("Rol modal: ", this.rol);

  }

  public cerrar_modal(){
    this.dialogRef.close({isEdit:false});
  }

  public editarUser(){
    this.dialogRef.close({isEdit:true});
  }
}
