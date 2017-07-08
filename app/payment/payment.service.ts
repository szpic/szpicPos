import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class PaymentService{
    private paymentModalClosedSource = new Subject<Number>();
    paymentClosed$ = this.paymentModalClosedSource.asObservable();

    AnnouncePaymentClosed(){
        this.paymentModalClosedSource.next(1);
    }
}