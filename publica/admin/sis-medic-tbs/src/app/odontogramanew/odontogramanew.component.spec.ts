import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OdontogramanewComponent } from './odontogramanew.component';

describe('OdontogramanewComponent', () => {
  let component: OdontogramanewComponent;
  let fixture: ComponentFixture<OdontogramanewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OdontogramanewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OdontogramanewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
