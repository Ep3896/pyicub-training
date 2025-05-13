import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RobotCamViewerComponent } from './robot-cam-viewer.component';

describe('RobotCamViewerComponent', () => {
  let component: RobotCamViewerComponent;
  let fixture: ComponentFixture<RobotCamViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RobotCamViewerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RobotCamViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
