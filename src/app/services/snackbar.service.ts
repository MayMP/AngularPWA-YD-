import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})

export class SnackbarService {
  constructor(
    private snackBar: MatSnackBar
  ) {}

  openSnackBar( message: string, action?: any, mode: any = 0 ){
    var snackbarMode;
    switch( mode ) {
      case -1:
        snackbarMode = 'error-snackbar'
        break;
      case 0:
        snackbarMode = 'message-snackbar'
        break;
      case 1: 
        snackbarMode = 'success-snackbar'
        break;
    }
    this.snackBar.open(message, action ? action : 'X', {
      duration: 5000, 
      panelClass: [snackbarMode]
    });
  }
}