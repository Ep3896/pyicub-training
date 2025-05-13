import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedDashboardDialogComponent } from './saved-dashboard-dialog.component';

describe('SavedDashboardDialogComponent', () => {
  let component: SavedDashboardDialogComponent;
  let fixture: ComponentFixture<SavedDashboardDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SavedDashboardDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SavedDashboardDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
