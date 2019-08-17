import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutonomoComponent } from './autonomo.component';

describe('AutonomoComponent', () => {
  let component: AutonomoComponent;
  let fixture: ComponentFixture<AutonomoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutonomoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutonomoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
