import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewExaComponent } from './view-exa.component';

describe('ViewExaComponent', () => {
  let component: ViewExaComponent;
  let fixture: ComponentFixture<ViewExaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewExaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewExaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
