import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsManagerComponent } from './actions-manager.component';

describe('ActionsManagerComponent', () => {
  let component: ActionsManagerComponent;
  let fixture: ComponentFixture<ActionsManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActionsManagerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActionsManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
