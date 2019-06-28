import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditmedicComponent } from './editmedic.component';

describe('EditmedicComponent', () => {
  let component: EditmedicComponent;
  let fixture: ComponentFixture<EditmedicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditmedicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditmedicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
