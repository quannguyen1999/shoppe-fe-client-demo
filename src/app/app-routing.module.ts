import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DetailProductComponent } from './components/products/detail-product/detail-product.component';
import { CartComponent } from './components/cart/cart.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: `product/detail/:id`,
    component: DetailProductComponent
  },
  {
    path: `cart`,
    component: CartComponent
  },
  {
    path: '',
    redirectTo: 'home', pathMatch: 'full'
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
