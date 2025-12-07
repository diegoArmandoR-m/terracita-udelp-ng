import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppReport } from '../util/app-report';
import { MovimientoInventario } from '../_class/movimiento-inventario';
import { MovimientoInventarioService } from '../_service/movimiento-inventario.service';
import { Producto } from '../_class/producto';
import { ProductoService } from '../_service/producto.service';
import { OtroMovimiento } from '../_class/otro-movimiento';
import { OtroMovimientoService } from '../_service/otro-movimiento.service';
import { Usuario } from '../_class/usuario';
import { UsuarioService } from '../_service/usuario.service';

@Component({
  selector: 'app-movimientos-inventario',
  templateUrl: './movimientos-inventario.html',
  styleUrls: ['./movimientos-inventario.css', '../app.css'],
  standalone: false
})
export class MovimientosInventario extends AppReport implements OnInit {

  movimientos: MovimientoInventario[] = [];
  movimiento: MovimientoInventario | null = null;

  productos: Producto[] = [];
  otrosMovimientos: OtroMovimiento[] = [];
  usuarios: Usuario[] = [];

  showModal = false;
  modalTitle = '';
  uri = 'procesos/movimientos-inventario';

  constructor(
    private movimientoInventarioService: MovimientoInventarioService,
    private productoService: ProductoService,
    private otroMovimientoService: OtroMovimientoService,
    private usuarioService: UsuarioService,
    router: Router
  ) {
    super(router);
  }

  ngOnInit(): void {
    this.movimientos = this.movimientoInventarioService.getAll();
    this.productos = this.productoService.getAll();
    this.otrosMovimientos = this.otroMovimientoService.getAll();
    this.usuarios = this.usuarioService.getAll();
  }

  openAddModal(): void {
    this.modalTitle = 'movimientos-inventario.add-movimiento-inventario';
    this.movimiento = null;
    this.showModal = true;
  }

  openEditModal(mov: MovimientoInventario): void {
    this.modalTitle = 'movimientos-inventario.edit-movimiento-inventario';
    this.movimiento = mov;
    this.showModal = true;
  }

  closeModalEvent(): void {
    this.showModal = false;
    this.movimiento = null;
    this.modalTitle = '';
  }

  saveEvent(value: MovimientoInventario): void {
    if (value.id) {
      this.movimientoInventarioService.edit(value);
    } else {
      this.movimientoInventarioService.add(value);
    }

    this.closeModalEvent();
    this.showModalMessage = true;
    this.modalTitleMessage = 'messages.sucess';
    this.messageBody = 'messages.save-sucess';
  }
}