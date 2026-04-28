import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductCardComponent } from "../productos/producto.component";
import { ProductsService } from "../../services/productos.services";
import { Product } from '../../models/producto.model';

@Component({
    selector: 'app-catalogo',
    standalone: true,
    imports: [CommonModule, RouterLink, ProductCardComponent],
    templateUrl: './catalogo.components.html',
    styleUrl: './catalogo.components.css'
})
export class CatalogoComponent implements OnInit {
    private productsService = inject(ProductsService);
    private cdr = inject(ChangeDetectorRef);   // inyectamos ChangeDetectorRef para forzar la detección de cambios porque por alguna razon de otra manera no cargan los datos de la bd

    products: Product[] = [];
    loading: boolean = true;
    error: string | null = null;

    ngOnInit(): void {
        this.productsService.getProducts().subscribe({
            next: (data: Product[]) => {
                this.products = data || [];
                this.loading = false;
                this.error = null;
                this.cdr.detectChanges();   // forzamos la detección de cambios para actualizar la vista con los productos cargados desde la bd
            },
            error: (err: any) => {
                console.error("Error:", err);
                this.loading = false;
                this.error = "Error al cargar los productos";
                this.cdr.detectChanges();
            }
        });
    }

    reloadProducts(): void {
        this.loading = true;
        this.error = null;
        this.products = [];

        this.productsService.getProducts().subscribe({
            next: (data) => {
                this.products = data || [];
                this.loading = false;
            },
            error: (err) => {
                this.loading = false;
                this.error = "Error al recargar";
            }
        });
    }
    trackById = (index: number, item: Product) => item?.id ?? index;
}
