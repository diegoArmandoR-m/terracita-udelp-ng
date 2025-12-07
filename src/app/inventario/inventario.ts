// src/app/inventario/inventario.ts
import { Component, OnInit } from '@angular/core';
import { Inventario as InventarioItem } from '../_class/inventario';
import { InventarioService } from '../_service/inventario.service';

@Component({
  selector: 'app-inventario',
  standalone: false,
  templateUrl: './inventario.html',
  styleUrls: ['./inventario.css', '../app.css'],
})
export class Inventarios implements OnInit {

  inventario: InventarioItem[] = [];

  constructor(private inventarioService: InventarioService) { }

  ngOnInit(): void {
    // Solo mostramos productos activos
    this.inventario = this.inventarioService.getAll();
  }
}