import { Component, Input} from '@angular/core';
import { Transaction} from './transaction';
import { BoughtItem } from '../bought-item/bought-item.component';
import { Item } from '../shared/item';

@Component({
  selector: 'tab',
  styles: [`
    .pane{
      padding: 1em;
    }
  `],
  template: `
    <div [hidden]="!active" class="pane">
        <bought-item-list [(transactions)]="ta" [(products)]="products"></bought-item-list>
    </div>
  `
})
export class Tab {
  @Input() products: Item[];
  @Input() ta :Transaction;
  @Input('tabTitle') title: string;
  @Input() active = false;
}