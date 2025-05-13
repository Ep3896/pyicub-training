import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppbarRobotCellComponent } from './appbar-robot-cell.component';

describe('AppbarRobotCellComponent', () => {
  let component: AppbarRobotCellComponent;
  let fixture: ComponentFixture<AppbarRobotCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppbarRobotCellComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppbarRobotCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
