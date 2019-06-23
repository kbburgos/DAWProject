import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OldreservationsComponent } from './oldreservations.component';

describe('OldreservationsComponent', () => {
  let component: OldreservationsComponent;
  let fixture: ComponentFixture<OldreservationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OldreservationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OldreservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
