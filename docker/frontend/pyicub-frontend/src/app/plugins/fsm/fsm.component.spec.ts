import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FsmComponent } from './fsm.component';

describe('Plugin1Component', () => {
  let component: FsmComponent;
  let fixture: ComponentFixture<FsmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FsmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FsmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
