import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OdontogramaVerComponent } from './odontograma-ver.component';

describe('OdontogramaVerComponent', () => {
  let component: OdontogramaVerComponent;
  let fixture: ComponentFixture<OdontogramaVerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OdontogramaVerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OdontogramaVerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
