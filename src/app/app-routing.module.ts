import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DetailProductComponent } from './components/products/detail-product/detail-product.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoryComponent } from './components/category/category.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: `cart`,
    component: CartComponent
  },
  {
    path: `login`,
    component: LoginComponent
  },
  {
    path: `register`,
    component: LoginComponent
  },
  {
    path: `category/:id`,
    component: CategoryComponent
  },
  {
    path: `product/detail/:id`,
    component: DetailProductComponent
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
