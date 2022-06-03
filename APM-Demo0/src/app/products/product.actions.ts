import { Product } from './product';

export class AddProduct {
    static readonly type = '[Product] Add';

    constructor(public product: Product) {}
}

export class GetProducts {
    static readonly type = '[Product] Get';
}

