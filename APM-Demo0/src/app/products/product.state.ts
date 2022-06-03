import { State, Action, StateContext, Selector, StateToken } from '@ngxs/store';
import { patch } from '@ngxs/store/operators';
import { Product } from './product';
import { AddProduct, GetProducts } from './product.actions';
import { ProductService } from './product.service';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

export class ProductStateModel {
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
        products: [
            {
                id: 1,
                productName: 'Leaf Rake',
                productCode: 'GDN-0011',
                description: 'Leaf rake with 48-inch wooden handle',
                starRating: 3.2
            },
            {
                id: 2,
                productName: 'Garden Cart',
                productCode: 'GDN-0023',
                description: '15 gallon capacity rolling garden cart',
                starRating: 4.2
            },
            {
                id: 5,
                productName: 'Hammer',
                productCode: 'TBX-0048',
                description: 'Curved claw steel hammer',
                starRating: 4.8
            },
            {
                id: 8,
                productName: 'Saw',
                productCode: 'TBX-0022',
                description: '15-inch steel blade hand saw',
                starRating: 3.7
            },
            {
                id: 10,
                productName: 'Video Game Controller',
                productCode: 'GMG-0042',
                description: 'Standard two-button video game controller',
                starRating: 4.6
            }
        ]
    }
})

@Injectable()
export class ProductState {

    constructor(private productService: ProductService) {}

    @Selector()
    static getProducts(state: ProductStateModel) {
        return state.products;
    }


    @Action(GetProducts)
    get(ctx: StateContext<ProductStateModel>) {
        return this.productService.getProducts().pipe(tap(p => ctx.setState(
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
}
