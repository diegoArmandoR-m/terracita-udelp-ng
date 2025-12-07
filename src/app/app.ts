import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Menu } from './_class/menu';
import { CommonModule } from '@angular/common';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: false,
})
export class App {
  //protected readonly title = signal('terracita-udelp-ng');

  menu: Menu[] = [
    {description: "menu.catalogos-generales",
      views:[
        {description:"views.producto",url:"/catalogos-generales/productos"},
        {description:"views.categoria",url:"/catalogos-generales/categorias"},
        {description:"views.unidad-medida",url:"/catalogos-generales/unidades-medida"},
        {description:"views.proveedor",url:"/catalogos-generales/proveedores"},
        {description:"views.metodo-pago",url:"/catalogos-generales/metodos-pagos"}
    ]},
    {description: "menu.procesos",
      views:[
        {description:"views.compras",url:"/procesos/compras"},
        {description:"views.detalles-compra",url:"/procesos/detalles-compra"},
        {description:"views.ventas",url:"/procesos/ventas"},
        {description:"views.detalles-venta",url:"/procesos/detalles-venta"},
        {description:"views.inventario",url:"/procesos/inventario"},
        {description:"views.movimientos-inventario",url:"/procesos/movimientos-inventario"},
        {description:"views.apertura-caja",url:"/procesos/apertura-caja"},
        {description:"views.otros-movimientos",url:"/procesos/otros-movimientos"}
    ]},
    {description: "menu.administracion",
      views:[
        {description:"views.usuarios",url:"/administracion/usuarios"}
    ]}
  ]
  constructor(private translocoService: TranslocoService,
    private http: HttpClient
  ) { 
    console.log("App component initialized");
  }

  ngOnInit() {
    this.translocoService.setActiveLang('es');
    this.translocoService.load('es').subscribe(data =>{
      console.log('Transloco loaded:', data);
    });// Siempre poner this

  }

}
