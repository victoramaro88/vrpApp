import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroVRPComponent } from './cadastro-vrp.component';

describe('CadastroVRPComponent', () => {
  let component: CadastroVRPComponent;
  let fixture: ComponentFixture<CadastroVRPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroVRPComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroVRPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
