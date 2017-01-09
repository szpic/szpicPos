import { Component, Input } from '@angular/core';
import { BoughtItem } from '../bought-item/bought-item.component';
import { Item } from '../shared/item';

@Component({
    moduleId: module.id,
    selector:'bought-item-list',
    templateUrl: 'bought-item-list.component.html'
})

export class BoughtItemList {
    @Input() products: Item[];
}