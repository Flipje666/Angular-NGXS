import { Product } from './product';

export class AddProduct {
    static readonly type = '[Product Page] AddProduct';

    constructor(public product: Product) {}
}

export class GetProducts {
    static readonly type = '[Product API] GetProducts';
}

export class ToggleProductCode {
    static readonly type = '[Product Page] ToggleProductCode'
}

export class SelectProduct {
    static readonly type = '[Product Page] SelectProduct'

    constructor(public product: Product) {}
}

