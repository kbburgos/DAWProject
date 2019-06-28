import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerExamenComponent } from './ver-examen.component';

describe('VerExamenComponent', () => {
  let component: VerExamenComponent;
  let fixture: ComponentFixture<VerExamenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerExamenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerExamenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
