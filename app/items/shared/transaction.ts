import { Item } from './item'
export class Transaction {
    products: Item[];
    name : string;
    constructor() {
        this.products = [];
        this.name = (Math.random()*100).toString();
    }
}