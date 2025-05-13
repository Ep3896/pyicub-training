import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphyComponent } from './graphy.component';

describe('GraphyComponent', () => {
  let component: GraphyComponent<any,any>;
  let fixture: ComponentFixture<GraphyComponent<any,any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GraphyComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
