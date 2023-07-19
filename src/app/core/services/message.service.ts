import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { Observable } from 'rxjs';
import { DeleteDialogComponent } from 'src/app/shared/components/delete-dialog/delete-dialog.component';


@Injectable({
  providedIn: 'root'
})
export class MessageService {
  constructor(private toast: HotToastService, private dialog: MatDialog) {}

  errorMessage = (errorText: any) => {
    this.toast.error(errorText);
  };

  successMessage = (text: string) => {
    this.toast.success(text);
  };
  deleteConfirmation = (header: string, body: string): Observable<any> => {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: { header, body }
    });
    return dialogRef.afterClosed();
  };

}
