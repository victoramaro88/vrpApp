import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoPCComponent } from './historico-pc.component';

describe('HistoricoPCComponent', () => {
  let component: HistoricoPCComponent;
  let fixture: ComponentFixture<HistoricoPCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoricoPCComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricoPCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
