import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticaUsuariosComponent } from './estadistica-usuarios.component';

describe('EstadisticaUsuariosComponent', () => {
  let component: EstadisticaUsuariosComponent;
  let fixture: ComponentFixture<EstadisticaUsuariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstadisticaUsuariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadisticaUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
