import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetErrorDialogComponent } from './widget-error-dialog.component';

describe('WidgetErrorDialogComponent', () => {
  let component: WidgetErrorDialogComponent;
  let fixture: ComponentFixture<WidgetErrorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WidgetErrorDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WidgetErrorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
