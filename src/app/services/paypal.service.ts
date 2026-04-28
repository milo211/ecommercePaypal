import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { enviroment } from '../../enviroments/enviroments';

@Injectable({
  providedIn: 'root'
})
export class PaypalService {
  private http = inject(HttpClient);
  private apiUrl = enviroment.apiUrl;
  crearOrden(payload:{
    items: any[],
    total: number
  }) {
    return this.http.post(`${this.apiUrl}/paypal/create-order`, payload);
  }
    capturarOrden(orderId: string) {
    return this.http.post(`${this.apiUrl}/paypal/capture-order`, { orderId });
  }
}