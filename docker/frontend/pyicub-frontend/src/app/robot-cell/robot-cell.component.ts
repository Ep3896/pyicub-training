import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Robot} from "../types/Robot";

@Component({
  selector: 'app-robot-cell',
  templateUrl: './robot-cell.component.html',
  styleUrl: './robot-cell.component.css'
})
export class RobotCellComponent {
  @Input() robot:Robot
  @Output() public cellClicked = new EventEmitter<Robot>();

  onClick(event:MouseEvent){
    this.cellClicked.emit(this.robot);
  }
}
