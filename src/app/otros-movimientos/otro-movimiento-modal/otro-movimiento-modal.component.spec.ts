import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtroMovimientoModalComponent } from './otro-movimiento-modal.component';

describe('OtroMovimientoModalComponent', () => {
  let component: OtroMovimientoModalComponent;
  let fixture: ComponentFixture<OtroMovimientoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OtroMovimientoModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtroMovimientoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
