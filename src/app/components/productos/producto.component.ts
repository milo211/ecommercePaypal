import { Component, Input, inject } from "@angular/core";
import { Product } from "../../models/producto.model";
import { CartService } from "../../services/carrito.service";

@Component({
    selector: 'product-card',
  standalone: true,
    imports: [],
    templateUrl: './producto.component.html',
    styleUrl: './producto.component.css'
})
export class ProductCardComponent {
    @Input() product: any;

  isImageLoaded = false;

  onImageLoad() {
    this.isImageLoaded = true;   // Muestrar imagen si ya cargo
  }
    private cartService = inject(CartService);

    addToCart() {
        this.cartService.addToCart(this.product);
    }

   onImageError(event: Event) {
  const img = event.target as HTMLImageElement;
  img.src = 'assets/images/no-image.jpg';   // Imagen de respaldo en Angular
  img.onerror = null;  // Previene loops
}
}