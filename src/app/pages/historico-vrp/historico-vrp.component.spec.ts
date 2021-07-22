import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoVRPComponent } from './historico-vrp.component';

describe('HistoricoVRPComponent', () => {
  let component: HistoricoVRPComponent;
  let fixture: ComponentFixture<HistoricoVRPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoricoVRPComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricoVRPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
