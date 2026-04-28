import { Routes } from '@angular/router';
import { CatalogoComponent } from './components/catalogo/catalogo.components';
import { CarritoComponent } from './components/carrito/carrito.components';

export const routes: Routes = [
    {path: '', component: CatalogoComponent},
    {path: 'carrito', component: CarritoComponent},
    {path: '**', redirectTo: ''}];
