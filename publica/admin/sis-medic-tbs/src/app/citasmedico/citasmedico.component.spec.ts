import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CitasmedicoComponent } from './citasmedico.component';

describe('CitasmedicoComponent', () => {
  let component: CitasmedicoComponent;
  let fixture: ComponentFixture<CitasmedicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CitasmedicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CitasmedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
