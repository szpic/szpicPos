import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Item } from '../shared/item';
import { ItemService } from '../shared/item.service';

@Component({
    moduleId: module.id,
    selector: 'item-list',
    templateUrl: 'item-list.component.html'
})
export class ItemList {
    items: Item[];
    subcriber: any;
    constructor(private itemService: ItemService) {

    }
    @Input() products: Item[];
    @Output() productAdded = new EventEmitter();
    ngOnInit() {
        this.getItems();
    }
    getItems(): void {
        this.subcriber = this.itemService.getItems()
            .subscribe(data => {
                if (!!data) {
                    this.items = data;
                }
            })
    }
    addToTa(item: Item): void {
        this.products.push(item);
        this.productAdded.emit();
    }

    public ngOnDestroy(): void {
        this.subcriber.unsubscribe();
    }
}