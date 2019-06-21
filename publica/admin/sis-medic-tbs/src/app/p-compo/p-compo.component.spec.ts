import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PCompoComponent } from './p-compo.component';

describe('PCompoComponent', () => {
  let component: PCompoComponent;
  let fixture: ComponentFixture<PCompoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PCompoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PCompoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
