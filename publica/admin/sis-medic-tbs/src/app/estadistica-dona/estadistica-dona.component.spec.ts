import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticaDonaComponent } from './estadistica-dona.component';

describe('EstadisticaDonaComponent', () => {
  let component: EstadisticaDonaComponent;
  let fixture: ComponentFixture<EstadisticaDonaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstadisticaDonaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadisticaDonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
