import { Component, Input } from '@angular/core';
import { Item } from '../shared/item';

@Component({
    moduleId: module.id,
    selector: 'bought-item',
    templateUrl: 'bought-item.component.html',
    styleUrls: ['bought-item.component.css']
})
export class BoughtItem {
    @Input() product:Item;
}