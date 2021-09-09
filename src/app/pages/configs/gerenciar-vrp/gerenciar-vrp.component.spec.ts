import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciarVRPComponent } from './gerenciar-vrp.component';

describe('GerenciarVRPComponent', () => {
  let component: GerenciarVRPComponent;
  let fixture: ComponentFixture<GerenciarVRPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GerenciarVRPComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GerenciarVRPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
