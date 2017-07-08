import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Item } from './items/shared/item';
import { Total } from './total/total';
import { Category } from './items/shared/category';
import { AuthService } from './auth.service';
import { LoginComponent } from './login/login.component';
import { Transaction } from './items/shared/transaction';
import { Tab } from './items/shared/tab.component';
import { TabsService } from './items/shared/tabs.service'
@Component({
  selector: 'main',
  template: `
   
    <div class='col-md-5' id="leftBar">
        <total styles="" [(total)]="total"></total>
        <div id="list">
        <tabs (tabChanged)="tabChanged($event)">
          <tab *ngFor="let ta of transactions" [tabTitle]="ta.name" [ta]="ta" [products]="ta.products"></tab>
        </tabs>
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
      <button id="button" (click)="showModal()">Show Popup</button>
    </div>
    <div id="modal" data-pop="slide-down" [ngClass]="{'show': isModalVisible}">
      <div class="popupcontrols">
        <span id="popupclose" (click)="showModal()">X</span>
      </div>
      <div class="popupcontent">
          <h1>Some Popup Content</h1>
      </div>
    </div>
  `,
  providers: [TabsService]
})
export class MainComponent implements OnChanges, OnInit {
  isModalVisible: Boolean;
  transactions: Transaction[];
  products: Item[];
  category: string;
  total: Total;
  selectedTa: number;
  constructor(public authService: AuthService, 
              private tabsService: TabsService) { }

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
    this.transactions = [new Transaction(), new Transaction()];
    this.selectedTa = 0;
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
  categoryChanged(val: Category) {
    console.log(val.category);
    this.category = val.category;
  }
  tabChanged(val: Tab) {
    let i = 0;
    this.selectedTa = this.transactions.findIndex((element) => {
      return element.name === val.title;
    });
    this.products = this.transactions[this.selectedTa].products;
    this.recountTotal();
  }
  roundValue(val: number): number {
    return Math.round(val * 100) / 100;
  }
  clearTa(): void {
    
    //this will be refactored. If closing ta then just remove it.
    this.transactions.splice(this.selectedTa,1);
    //then add new clean one
    this.selectedTa =0;
    this.transactions.push(new Transaction);
    this.products = this.transactions[this.selectedTa].products;
    this.category = undefined;
    //inform tabs that they should refresh
    this.tabsService.announceTabChange(this.transactions[this.selectedTa].name)
    this.recountTotal();  
  }
  showModal(): void{
    this.isModalVisible= !this.isModalVisible;
  }
}
