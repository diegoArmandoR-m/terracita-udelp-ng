import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AperturaCaja } from './apertura-caja';

describe('AperturaCaja', () => {
  let component: AperturaCaja;
  let fixture: ComponentFixture<AperturaCaja>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AperturaCaja]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AperturaCaja);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
