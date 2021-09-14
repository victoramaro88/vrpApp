import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroPCComponent } from './cadastro-pc.component';

describe('CadastroPCComponent', () => {
  let component: CadastroPCComponent;
  let fixture: ComponentFixture<CadastroPCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroPCComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroPCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
