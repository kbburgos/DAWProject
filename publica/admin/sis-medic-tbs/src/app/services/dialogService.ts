import { SnackMessageComponent } from './../snack-message/snack-message.component';
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig,MatSnackBarRef } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  
  constructor(private dialog: MatSnackBar) { }
  private configSuccess: MatSnackBarConfig = {
    
    duration: 10000,
    horizontalPosition: 'right',
    verticalPosition: 'bottom'
  };

  openConfirmDialog(msg:any){
   return this.dialog.openFromComponent(SnackMessageComponent,{data:msg,...this.configSuccess})
  }

  
}
