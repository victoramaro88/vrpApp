import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciarpcComponent } from './gerenciarpc.component';

describe('GerenciarpcComponent', () => {
  let component: GerenciarpcComponent;
  let fixture: ComponentFixture<GerenciarpcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GerenciarpcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GerenciarpcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
