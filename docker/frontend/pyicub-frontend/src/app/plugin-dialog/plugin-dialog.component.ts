import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Plugin} from "../types/Plugin";
import {Application} from "../types/Application";


@Component({
  selector: 'app-plugin-dialog',
  templateUrl: './plugin-dialog.component.html',
  styleUrl: './plugin-dialog.component.css'
})
export class PluginDialogComponent {

  onCheckboxChange(plugin:Plugin){
    this.data.togglePlugin(plugin)
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: Application) {}

}
