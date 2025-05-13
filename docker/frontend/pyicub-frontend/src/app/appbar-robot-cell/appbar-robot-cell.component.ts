import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Robot} from "../types/Robot";

@Component({
  selector: 'appbar-robot-cell',
  templateUrl: './appbar-robot-cell.component.html',
  styleUrl: './appbar-robot-cell.component.css'
})
export class AppbarRobotCellComponent {
  @Input() robot:Robot
  @Output() public cellClicked = new EventEmitter<Robot>();

  onClick(event:MouseEvent){
    this.cellClicked.emit(this.robot);
  }
}
