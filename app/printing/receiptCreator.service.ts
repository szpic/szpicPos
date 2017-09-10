import { Injectable } from '@angular/core';
import { Transaction } from './../items/shared/transaction';

@Injectable()
export class ReceiptCreatorService {
    private endOfLine = "\r\n";


    createReceipt(ta: Transaction): string {
        let receipt = "Receipt \r\n";
        ta.products.forEach(element => {
            receipt = receipt + `Product name: ${element.description} ` + this.endOfLine;
            receipt = receipt + `Product quantity: ${element.count} ` + this.endOfLine;
            receipt = receipt + `Product price: ${element.price} ` + this.endOfLine;
        });
        return receipt;
    }
}