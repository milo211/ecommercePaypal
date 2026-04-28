import { Injectable, inject } from "@angular/core";
import { Product } from "../models/producto.model";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, shareReplay, filter } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
        providedIn: 'root'
})

export class ProductsService {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:3300/api/productos';

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>('/api/productos');
    }

    postProducto(producto: any) {
    return this.http.post<any>('/api/productos', producto);
}
    /*getAll(): Observable<Product[]> {
        if (this.products) {
            return of(this.products);
        }

        if (this.loaded$.value) {
            return this.loaded$.asObservable().pipe(filter(p => p !== null)) as Observable<Product[]>;
        }

        if (isPlatformBrowser(this.platformId)) {
            // Load from XML in browser
            return this.http.get('assets/data/productos.xml', { responseType: 'text' })
                .pipe(
                    map(xmlString => {
                        const parser = new DOMParser();
                        const doc = parser.parseFromString(xmlString, "text/xml");
                        const items = doc.querySelectorAll('producto');
                        const result: Product[] = [];

                        items.forEach(item => {
                            result.push({
                                id: Number(item.querySelector('id')?.textContent),
                                nombre: item.querySelector('nombre')?.textContent || '',
                                descripcion: item.querySelector('descripcion')?.textContent || '',
                                categoria: item.querySelector('categoria')?.textContent || '',
                                precio: Number(item.querySelector('precio')?.textContent),
                                imagen: item.querySelector('imagen')?.textContent || '',
                                instock: item.querySelector('instock')?.textContent === 'true'
                            });
                        });

                        this.products = result;
                        this.loaded$.next(result);
                        return result;
                    }),
                    shareReplay(1)
                );
        } else {
            // Mock data for SSR
            const mockProducts: Product[] = [
                {
                    id: 1,
                    nombre: 'Laptop Gamer',
                    descripcion: 'Laptop de alto rendimiento para gaming',
                    categoria: 'Electrónica',
                    precio: 1500,
                    imagen: 'laptop.jpg',
                    instock: true
                },
                {
                    id: 2,
                    nombre: 'Mouse Inalámbrico',
                    descripcion: 'Mouse ergonómico con batería recargable',
                    categoria: 'Accesorios',
                    precio: 50,
                    imagen: 'mouse.jpg',
                    instock: true
                },
                {
                    id: 3,
                    nombre: 'Teclado Mecánico',
                    descripcion: 'Teclado RGB con switches mecánicos',
                    categoria: 'Accesorios',
                    precio: 120,
                    imagen: 'teclado.jpg',
                    instock: false
                },
                {
                    id: 4,
                    nombre: 'Monitor 4K',
                    descripcion: 'Monitor UHD de 27 pulgadas',
                    categoria: 'Electrónica',
                    precio: 400,
                    imagen: 'monitor.jpg',
                    instock: true
                },
                {
                    id: 5,
                    nombre: 'Auriculares Bluetooth',
                    descripcion: 'Auriculares con cancelación de ruido',
                    categoria: 'Audio',
                    precio: 200,
                    imagen: 'auriculares.jpg',
                    instock: true
                },
                {
                    id: 6,
                    nombre: 'Smartphone',
                    descripcion: 'Teléfono inteligente con cámara de 48MP',
                    categoria: 'Electrónica',
                    precio: 800,
                    imagen: 'smartphone.jpg',
                    instock: true
                }
            ];

            this.products = mockProducts;
            this.loaded$.next(mockProducts);
            return of(mockProducts);
        }
    }*/
}