import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppbarApplicationCellComponent } from './appbar-application-cell.component';

describe('AppbarApplicationCellComponent', () => {
  let component: AppbarApplicationCellComponent;
  let fixture: ComponentFixture<AppbarApplicationCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppbarApplicationCellComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppbarApplicationCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
