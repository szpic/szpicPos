import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Item } from './items/shared/item';
import { Total } from './total/total';
import { Category } from './items/shared/category';
import { AuthService } from './auth.service';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'main',
  template: `
   
    <div class='col-md-5' id="leftBar">
        <total styles="" [(total)]="total"></total>
        <div id="list">
          <bought-item-list [(products)]="products"></bought-item-list>
        </div>
    </div>
    <div class='col-md-2' id='categories'>
      <category (categoryChanged)="categoryChanged($event)"></category>
    </div>
    <div class='col-md-5'>
      <item-list [(products)]="products" [(category)]="category" (productAdded)="recountTotal()"></item-list>
    </div>
    <div class="col-md-12 footer">
      <button class="btn btn-primary" (click)="clearTa()">Clear Ta</button>
      <button class="btn btn-primary" [routerLink]="['/login']" *ngIf="authService.isLoggedIn">LogOut</button>
    </div>
  `
})
export class MainComponent implements OnChanges, OnInit {
  products: Item[];
  category: string;
  total: Total;
  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.fillData();
    this.recountTotal();
  }
  ngOnChanges(changes: SimpleChanges) {
    alert("Wykrywam Zmiany");
  }
  myValueChange(event: any) {
    console.log(event);
  }
  fillData() {
    this.total = {
      totalTax: 0,
      totalCount: 0,
      totalValue: 0
    };
    this.products = [];
  }
  recountTotal() {
    this.total.totalCount =
      this.products.reduce((a, b) => a + b.count, 0);
    this.total.totalValue =
      this.products.reduce((a, b) => a + b.price, 0);
    this.total.totalTax =
      this.products.reduce((a, b) => a + b.price, 0);

    this.total.totalTax = this.roundValue(this.total.totalTax * 0.23);
    //Sometimes I am loosing accuracy:
    this.total.totalValue = this.roundValue(this.total.totalValue);
  };
  categoryChanged(val: Category){
    console.log(val.category);
    this.category = val.category;
  }
  roundValue(val: number): number {
    return Math.round(val * 100) / 100;
  }
  clearTa():void{
    this.products = [];
    this.category = undefined;
    this.recountTotal();
  }
}
