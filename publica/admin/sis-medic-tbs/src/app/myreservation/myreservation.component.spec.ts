import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyreservationComponent } from './myreservation.component';

describe('MyreservationComponent', () => {
  let component: MyreservationComponent;
  let fixture: ComponentFixture<MyreservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyreservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyreservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
