import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetodoPagoModalComponent } from './metodo-pago-modal.component';

describe('MetodoPagoModalComponent', () => {
  let component: MetodoPagoModalComponent;
  let fixture: ComponentFixture<MetodoPagoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MetodoPagoModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MetodoPagoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
