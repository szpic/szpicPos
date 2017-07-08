import { Component, Input } from '@angular/core'
import { PaymentService } from './payment.service';

@Component({
    selector: 'payment',
    templateUrl: 'app/payment/payment.component.html'
})
export class PaymentComponent {
    @Input() isModalVisible: Boolean;
    constructor(private paymentService: PaymentService) { };
    hideMe(): void {
        this.paymentService.AnnouncePaymentClosed()
    }
}