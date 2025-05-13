import {Component, Inject} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {Application} from "../types/Application";

@Component({
  selector: 'app-restore-session-dialog',
  templateUrl: './restore-session-dialog.component.html',
  styleUrl: './restore-session-dialog.component.css'
})
export class RestoreSessionDialogComponent {

  constructor(public dialogRef:MatDialogRef<RestoreSessionDialogComponent>) {}

  onYesButtonClick(){
    this.dialogRef.close(true)
  }

  onNoButtonClick(){
    this.dialogRef.close(false)
  }

}
