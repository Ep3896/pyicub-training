import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RobotCellComponent } from './robot-cell.component';

describe('RobotCellComponent', () => {
  let component: RobotCellComponent;
  let fixture: ComponentFixture<RobotCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RobotCellComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RobotCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
