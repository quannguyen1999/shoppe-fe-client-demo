import { NgModule } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTreeModule } from '@angular/material/tree';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { GalleriaModule } from 'primeng/galleria';


import { TruncateTextPipe } from './utils/truncate-text.pipe';

import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { CarouselComponent } from './components/carousel/carousel.component';

import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { CategoryCarouselComponent } from './components/carousel/category-carousel/category-carousel.component';
import { TipCarouselComponent } from './components/carousel/tip-carousel/tip-carousel.component';
import { ProductsComponent } from './components/products/products.component';
import { DetailProductComponent } from './components/products/detail-product/detail-product.component';
import { DropdownModule } from 'primeng/dropdown';
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { FooterComponent } from './components/footer/footer.component';
import { LoadingUtilComponent } from './utils/loading-util/loading-util.component';
import { ReviewProductComponent } from './components/products/review-product/review-product.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    TruncateTextPipe,
    CarouselComponent,
    CategoryCarouselComponent,
    TipCarouselComponent,
    ProductsComponent,
    DetailProductComponent,
    FooterComponent,
    LoadingUtilComponent,
    DetailProductComponent,
    ReviewProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatGridListModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatExpansionModule,
    MatTreeModule,
    MatListModule,
    MatButtonModule,
    MatToolbarModule,
    MatTableModule,
    MatBadgeModule,
    MatSnackBarModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule,
    HttpClientModule,
    DropdownModule,
    OverlayPanelModule,
    ButtonModule,
    InputTextModule,
    CheckboxModule,
    RadioButtonModule,
    MatAutocompleteModule,
    CarouselModule,
    CardModule,
    InfiniteScrollModule,
    MatProgressSpinnerModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    GalleriaModule,
    MatButtonModule
 ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
