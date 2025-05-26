import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent, DialogData } from './dialog.component';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DialogService {
  constructor(private dialog: MatDialog) {}

  /**
   * Opens a dialog with given title, content and buttons.
   * Returns an observable that emits the button value when closed.
   */
  open(data: DialogData): Observable<any> {
    const dialogRef = this.dialog.open(DialogComponent, { data });
    return dialogRef.afterClosed();
  }
}
