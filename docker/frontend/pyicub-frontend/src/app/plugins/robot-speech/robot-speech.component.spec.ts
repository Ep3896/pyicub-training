import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RobotSpeechComponent } from './robot-speech.component';

describe('RobotSpeechComponent', () => {
  let component: RobotSpeechComponent;
  let fixture: ComponentFixture<RobotSpeechComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RobotSpeechComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RobotSpeechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
