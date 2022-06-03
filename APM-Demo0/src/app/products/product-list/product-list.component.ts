import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { ProductService } from '../product.service';
import { Select, Store } from '@ngxs/store';
import { Product } from '../product';
import { ProductStateModel, PRODUCT_STATE_TOKEN } from '../product.state';
import { GetProducts } from '../product.actions';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  @Select(PRODUCT_STATE_TOKEN) products$: Observable<ProductStateModel>;
  // public products$: Observable<Product[]>;
  
  pageTitle = 'Products';
  errorMessage: string;

  displayCode: boolean;

  products: Product[];

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;
  sub: Subscription;

  constructor(private productService: ProductService, private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(new GetProducts());
    // this.sub = this.productService.selectedProductChanges$.subscribe(
    //   currentProduct => this.selectedProduct = currentProduct
    // );

    // this.productService.getProducts().subscribe({
    //   next: (products: Product[]) => this.products = products,
    //   error: err => this.errorMessage = err
    // });
  }

  ngOnDestroy(): void {
    
  }

  checkChanged(): void {
    this.displayCode = !this.displayCode;
  }

  newProduct(): void {
    this.productService.changeSelectedProduct(this.productService.newProduct());
  }

  productSelected(product: Product): void {
    this.productService.changeSelectedProduct(product);
  }

}
