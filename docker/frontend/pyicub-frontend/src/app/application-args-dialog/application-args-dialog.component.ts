import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Application} from "../types/Application";
import {ApplicationArgType} from "../types/ApplicationArgType";

@Component({
  selector: 'app-application-args-dialog',
  templateUrl: './application-args-dialog.component.html',
  styleUrl: './application-args-dialog.component.css'
})
export class ApplicationArgsDialogComponent{

  args:any = {}

  get buttonEnabled(){
    let enabled = true;
    for(let arg of Object.keys(this.data.argsTemplate)){
      if(!this.args[arg]){
        enabled = false;
      }
    }
    return enabled
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: Application, public dialogRef:MatDialogRef<ApplicationArgsDialogComponent>) {}

  onButtonClick(): void {
    this.dialogRef.close(this.args);
    //console.log(this.args)
  }

  protected readonly Object = Object;
  protected readonly ApplicationArgType = ApplicationArgType;

}
