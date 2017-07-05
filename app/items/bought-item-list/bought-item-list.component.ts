import { Component, Input,  Output, EventEmitter } from '@angular/core';
import { BoughtItem } from '../bought-item/bought-item.component';
import { Item } from '../shared/item';
import { Tabs } from '../shared/tabs.component';
import { Tab } from '../shared/tab.component';
import { Transaction } from '../shared/transaction';
@Component({
    moduleId: module.id,
    selector: 'bought-item-list',
    templateUrl: 'bought-item-list.component.html'
})

export class BoughtItemList {
    @Input() products: Item[];
    @Input() transactions: Transaction[];
    @Output() tabChanged = new EventEmitter();
    
    Changed(val: Tab) {
          this.tabChanged.emit(val);
    }
}