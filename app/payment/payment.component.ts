import { Component, Input } from '@angular/core'
import { PaymentService } from './payment.service';
import { Total } from '../total/total';

@Component({
    selector: 'payment',
    templateUrl: 'app/payment/payment.component.html'
})
export class PaymentComponent {
    @Input() isModalVisible: Boolean;
    @Input() total: Total;
    constructor(private paymentService: PaymentService) { };
    hideMe(): void {
        this.paymentService.AnnouncePaymentClosed()
    }
    pay():void{
        this.paymentService.AnnouncePaymentFullfilled();
    }
}