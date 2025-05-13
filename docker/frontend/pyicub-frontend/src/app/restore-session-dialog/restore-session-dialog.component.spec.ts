import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestoreSessionDialogComponent } from './restore-session-dialog.component';

describe('RestoreSessionDialogComponent', () => {
  let component: RestoreSessionDialogComponent;
  let fixture: ComponentFixture<RestoreSessionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RestoreSessionDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RestoreSessionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
