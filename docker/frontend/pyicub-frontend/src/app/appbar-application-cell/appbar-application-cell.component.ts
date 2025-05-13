import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Application} from "../types/Application";

@Component({
  selector: 'appbar-application-cell',
  templateUrl: './appbar-application-cell.component.html',
  styleUrl: './appbar-application-cell.component.css'
})
export class AppbarApplicationCellComponent {
  @Input() application:Application
  @Output() public cellClicked = new EventEmitter<Application>();

  onClick(event:MouseEvent){
    this.cellClicked.emit(this.application);
  }
}
