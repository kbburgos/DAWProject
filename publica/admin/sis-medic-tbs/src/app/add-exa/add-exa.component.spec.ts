import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExaComponent } from './add-exa.component';

describe('AddExaComponent', () => {
  let component: AddExaComponent;
  let fixture: ComponentFixture<AddExaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddExaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
