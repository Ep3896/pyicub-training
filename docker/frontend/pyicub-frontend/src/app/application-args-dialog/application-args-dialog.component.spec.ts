import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationArgsDialogComponent } from './application-args-dialog.component';

describe('ApplicationArgsDialogComponent', () => {
  let component: ApplicationArgsDialogComponent;
  let fixture: ComponentFixture<ApplicationArgsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApplicationArgsDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApplicationArgsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
