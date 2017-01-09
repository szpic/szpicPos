import { Component, Input } from '@angular/core';
import { Total} from './total';
@Component({
    selector: 'total',
    templateUrl: 'app/total/total.component.html',
    styleUrls: ['app/total/total.component.css']
})
export class TotalComponent {
    @Input() total: Total;
 }
