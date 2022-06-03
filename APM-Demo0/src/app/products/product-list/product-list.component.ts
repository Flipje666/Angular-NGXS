import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { ProductService } from '../product.service';
import { Select, Store } from '@ngxs/store';
import { Product } from '../product';
import { ProductState, ProductStateModel, PRODUCT_STATE_TOKEN } from '../product.state';
import { GetProducts, SelectProduct, ToggleProductCode } from '../product.actions';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  @Select(PRODUCT_STATE_TOKEN) products$: Observable<ProductStateModel>;
  @Select(ProductState.getSelectedProduct) currentProduct$: Observable<Product>;
  
  pageTitle = 'Products';
  errorMessage: string;

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;
  sub: Subscription;

  
  constructor(private productService: ProductService, private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(new GetProducts());

    this.currentProduct$.subscribe((p) => this.selectedProduct = p);

    this.sub = this.productService.selectedProductChanges$.subscribe(
      currentProduct => this.selectedProduct = currentProduct
    );

    // this.productService.getProducts().subscribe({
    //   next: (products: Product[]) => this.products = products,
    //   error: err => this.errorMessage = err
    // });
  }

  ngOnDestroy(): void {
    
  }

  checkChanged(): void {
    this.store.dispatch(new ToggleProductCode());
  }

  newProduct(): void {
    this.productService.changeSelectedProduct(this.productService.newProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(new SelectProduct(product));

    this.productService.changeSelectedProduct(product);
  }

}
