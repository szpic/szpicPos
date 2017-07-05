import { Component, Input, OnInit, Output, EventEmitter, OnDestroy, SimpleChanges } from '@angular/core';
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
    @Input() category: string;
    @Output() productAdded = new EventEmitter();
    ngOnInit() {
        this.getItems(this.category);
    }
    getItems(category: string): void {
        this.subcriber = this.itemService.getItems(category)
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
    ngOnChanges(changes: SimpleChanges) {
        if ((!!changes.category && !changes.category.currentValue) || !changes.category) {
            return;
        }
        else {
            //category changed so reload items
            this.getItems(this.category);
        }
    }
}