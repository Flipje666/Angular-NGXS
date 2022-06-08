import { State, Action, StateContext, Selector, StateToken } from '@ngxs/store';
import { patch } from '@ngxs/store/operators';
import { Product } from './product';
import { AddProduct, GetProducts, SelectProduct, ToggleProductCode } from './product.actions';
import { ProductService } from './product.service';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AppState } from '../app.state';

export interface ProductStateModel extends AppState {
    showProductCode: boolean;
    currentProduct: Product;
    products: Product[];
}

export const PRODUCT_STATE_TOKEN = new StateToken<ProductStateModel>('products');

@State<ProductStateModel>({
    name: PRODUCT_STATE_TOKEN,
    defaults: {
        showProductCode: false,
        currentProduct: null,
        products: []
    }
})

@Injectable()
export class ProductState {

    constructor(private productService: ProductService) {}

    @Selector()
    static getProducts(state: ProductStateModel): Product[] {
        return state.products;
    }

    @Selector()
    public static getSelectedProduct(state: ProductStateModel): Product {
        return state.currentProduct;
    }


    @Action(GetProducts)
    get(ctx: StateContext<ProductStateModel>) {
        return this.productService.getProducts().pipe(
            tap(p => ctx.setState(
            patch({
                products: p
            })
        )))
    }

    @Action(AddProduct)
    add({getState, patchState }: StateContext<ProductStateModel>, { product }: AddProduct) {
        const state = getState();
        patchState({
            products: [...state.products, product]
        });
    }

    @Action(ToggleProductCode)
    public toggleProductCode(ctx: StateContext<ProductStateModel>): void {
        const state = ctx.getState();
        ctx.setState({
            ...state,
            showProductCode: !state.showProductCode
        });
    }

    @Action(SelectProduct)
    public selectProduct(ctx: StateContext<ProductStateModel>, { product }: SelectProduct): void {
        ctx.patchState({
            currentProduct: product
        })
    }
}
