import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewmedicComponent } from './newmedic.component';

describe('NewmedicComponent', () => {
  let component: NewmedicComponent;
  let fixture: ComponentFixture<NewmedicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewmedicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewmedicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
