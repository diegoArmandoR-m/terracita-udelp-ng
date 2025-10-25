import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtrosMovimientos } from './otros-movimientos';

describe('OtrosMovimientos', () => {
  let component: OtrosMovimientos;
  let fixture: ComponentFixture<OtrosMovimientos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OtrosMovimientos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtrosMovimientos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
