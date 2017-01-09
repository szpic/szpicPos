import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Item } from '../shared/item';
import { ItemService } from '../shared/item.service';

@Component({
    moduleId: module.id,
    selector:'item-list',
    templateUrl: 'item-list.component.html'
})
export class ItemList{
    items: Item[];
    constructor(private itemService: ItemService){

    }
    @Input() products: Item[];
    @Output() productAdded = new EventEmitter();
    ngOnInit(){
        this.getItems();
    }
    getItems():void{
        this.itemService.getItems()
            .then(items => this.items = items);
    }
    addToTa(item:Item):void{
        this.products.push(item);
        this.productAdded.emit();
    }
}