import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesManagerComponent } from './services-manager.component';

describe('ServicesManagerComponent', () => {
  let component: ServicesManagerComponent;
  let fixture: ComponentFixture<ServicesManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServicesManagerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServicesManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
