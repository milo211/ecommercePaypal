import { Component, inject, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService, CartItem } from '../../services/carrito.service';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

declare var paypal: any;

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './carrito.components.html',
  styleUrl: './carrito.components.css'
})
export class CarritoComponent implements AfterViewInit {
  private cartService = inject(CartService);
  private http = inject(HttpClient);
  cartItems$ = this.cartService.cartItems$;

  private payPalClientId = 'ASgFS8zWniqGX2F60LH7VhqZTYtAPMCsp5m207VPA2EPmxfotyF3vNl0dcK3OEUynmj9qBYOUBj6qnYp';
  private payPalCurrency = 'MXN';

  getTotal() {
    return this.cartService.getTotal();
  }

  removeItem(productId: number) {
    this.cartService.removeFromCart(productId);
  }

  updateQuantity(productId: number, quantity: number) {
    this.cartService.updateQuantity(productId, quantity);
  }

  downloadXML() {
    this.cartService.downloadXML();
  }

  ngAfterViewInit() {
    this.loadPayPalScript().then(() => {
      this.renderPayPalButton();
    });
  }

  private loadPayPalScript(): Promise<void> {
    return new Promise((resolve) => {
      if ((window as any).paypal) {
        resolve();
        return;
      }
      const script = document.createElement('script');
      script.src = `https://www.paypal.com/sdk/js?client-id=${this.payPalClientId}&currency=${this.payPalCurrency}`;
      script.onload = () => resolve();
      document.head.appendChild(script);
    });
  }

  private renderPayPalButton() {
    if (!(window as any).paypal) {
      console.error('PayPal SDK no está disponible.');
      return;
    }

    paypal.Buttons({
      style: {
        layout: 'vertical',
        color: 'black',
        shape: 'rect',
        label: 'paypal'
      },
      createOrder: async (data: any, actions: any) => {
        const response = await lastValueFrom(this.http.post('http://localhost:3000/api/paypal/create-order', {
          items: this.cartService.getCartItems(),
          total: this.getTotal()
        }));
        return (response as any).id;
      },
      onApprove: async (data: any, actions: any) => {
        await lastValueFrom(this.http.post('http://localhost:3000/api/paypal/capture-order', {
          orderID: data.orderID
        }));
        alert('Pago completado exitosamente!');
        this.cartService.clearCart();
      },
      onCancel: () => {
        alert('Pago cancelado.');
      },
      onError: (err: any) => {
        console.error('Error PayPal:', err);
        alert('Hubo un error al procesar el pago con PayPal.');
      }
    }).render('#paypal-button-container');
  }
}