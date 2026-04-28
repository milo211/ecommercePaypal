import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/producto.model';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItems.asObservable();

  addToCart(product: Product) {
    const currentItems = this.cartItems.value;
    const existingItem = currentItems.find(item => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      currentItems.push({ product, quantity: 1 });
    }

    this.cartItems.next([...currentItems]);
  }

  removeFromCart(productId: number) {
    const currentItems = this.cartItems.value.filter(item => item.product.id !== productId);
    this.cartItems.next(currentItems);
  }

  updateQuantity(productId: number, quantity: number) {
    const currentItems = this.cartItems.value;
    const item = currentItems.find(item => item.product.id === productId);
    if (item) {
      item.quantity = quantity;
      if (item.quantity <= 0) {
        this.removeFromCart(productId);
      } else {
        this.cartItems.next([...currentItems]);
      }
    }
  }

  getTotal(): number {
    return this.cartItems.value.reduce((total, item) => total + (item.product.precio * item.quantity), 0);
  }

  getCartItems(): CartItem[] {
    return this.cartItems.value;
  }

  clearCart() {
    this.cartItems.next([]);
  }

  generateXML(): string {
    const items = this.cartItems.value;
    const date = new Date().toISOString();
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<recibo>\n';
    xml += `  <fecha>${date}</fecha>\n`;
    xml += '  <productos>\n';
    items.forEach(item => {
      xml += '    <producto>\n';
      xml += `      <id>${item.product.id}</id>\n`;
      xml += `      <nombre>${item.product.nombre}</nombre>\n`;
      xml += `      <precio>${item.product.precio}</precio>\n`;
      xml += `      <cantidad>${item.quantity}</cantidad>\n`;
      xml += `      <subtotal>${item.product.precio * item.quantity}</subtotal>\n`;
      xml += '    </producto>\n';
    });
    xml += '  </productos>\n';
    xml += `  <total>${this.getTotal()}</total>\n`;
    xml += '</recibo>';
    return xml;
  }

  downloadXML() {
    const xml = this.generateXML();
    const blob = new Blob([xml], { type: 'application/xml' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'recibos.xml';
    a.click();
    window.URL.revokeObjectURL(url);
  }
}