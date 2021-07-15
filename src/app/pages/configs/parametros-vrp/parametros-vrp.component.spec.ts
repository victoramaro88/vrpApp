import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametrosVRPComponent } from './parametros-vrp.component';

describe('ParametrosVRPComponent', () => {
  let component: ParametrosVRPComponent;
  let fixture: ComponentFixture<ParametrosVRPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParametrosVRPComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametrosVRPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
