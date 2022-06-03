import { Product } from './product';

export class AddProduct {
    static readonly type = '[Product] Add';

    constructor(public product: Product) {}
}

export class GetProducts {
    static readonly type = '[Product] Get';
}

export class ToggleProductCode {
    static readonly type = '[Product] Toggle Show Code'
}

export class SelectProduct {
    static readonly type = '[Product] Select'

    constructor(public product: Product) {}
}

