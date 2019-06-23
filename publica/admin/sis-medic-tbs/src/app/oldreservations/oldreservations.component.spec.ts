import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OldReservationsComponent } from './oldreservations.component';

describe('OldreservationsComponent', () => {
  let component: OldReservationsComponent;
  let fixture: ComponentFixture<OldReservationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OldReservationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OldReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
