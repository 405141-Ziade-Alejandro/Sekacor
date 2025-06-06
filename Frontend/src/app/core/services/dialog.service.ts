import {inject, Injectable} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {map, Observable} from "rxjs";
import {ConfirmDialogComponent} from "../../shared/confirm-dialog/confirm-dialog.component";
import {AlertDialogComponent} from "../../shared/alert-dialog/alert-dialog.component";

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor() { }

  private dialog = inject(MatDialog)

  confirm(title:string,message:string):Observable<boolean> {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        // width: '90vw',
        // maxWidth: '900px',
        // height:'20vh',
        // maxHeight: '900px',
        autoFocus: false,
      data: { title,message }
    })
    return dialogRef.afterClosed().pipe(
      map(result => result===true)
    )
  }

  alert(title:string,message:string):Observable<void>{
    const dialogRef = this.dialog.open(AlertDialogComponent,{
      data: { title,message }
    })

    return dialogRef.afterClosed()
  }
}
