import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProximamenteComponent } from './proximamente.component';

describe('ProximamenteComponent', () => {
  let component: ProximamenteComponent;
  let fixture: ComponentFixture<ProximamenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProximamenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProximamenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
