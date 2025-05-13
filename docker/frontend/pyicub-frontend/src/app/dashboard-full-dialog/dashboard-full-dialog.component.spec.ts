import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardFullDialogComponent } from './dashboard-full-dialog.component';

describe('DashboardFullDialogComponent', () => {
  let component: DashboardFullDialogComponent;
  let fixture: ComponentFixture<DashboardFullDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardFullDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardFullDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
