import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-widget-error-dialog',
  templateUrl: './widget-error-dialog.component.html',
  styleUrl: './widget-error-dialog.component.css'
})
export class WidgetErrorDialogComponent {

  @Input() title?:string=undefined;
  @Input() messageError:string="";
  @Output() buttonClick = new EventEmitter<string>();

  onClick(){
    this.buttonClick.emit()
  }

  protected readonly undefined = undefined;
}
