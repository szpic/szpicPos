import { Component, Input, OnInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Item } from './items/shared/item';
import { Total } from './total/total';
import { Category } from './items/shared/category';
import { AuthService } from './auth.service';
import { LoginComponent } from './login/login.component';
import { Transaction } from './items/shared/transaction';
import { Tab } from './items/shared/tab.component';
import { TabsService } from './items/shared/tabs.service';
import { PaymentComponent } from './payment/payment.component';
import { Subscription } from 'rxjs/Subscription';
import { PaymentService } from './payment/payment.service';
import { TransactionSenderService } from './items/shared/transactionSender.service';
import { ReceiptCreatorService } from './printing/receiptCreator.service';
import { TablesComponent } from './tables/tables.component';
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
      <button class="btn btn-primary" (click)="showModal()">End Ta</button>
      <button class="btn btn-primary" [routerLink]="['/login']" *ngIf="authService.isLoggedIn">LogOut</button>
    </div>
    <payment [(total)]="total" [(isModalVisible)] ="isModalVisible"></payment>
    <tables></tables>
  `,
  providers: [TabsService, PaymentService]
})
export class MainComponent implements OnChanges, OnInit, OnDestroy {
  isModalVisible: Boolean;
  transactions: Transaction[];
  products: Item[];
  category: string;
  total: Total;
  selectedTa: number;
  subscription: Subscription;
  constructor(public authService: AuthService,
    private tabsService: TabsService,
    private paymentService: PaymentService,
    private transactionSenderService: TransactionSenderService,
    private receiptCreatorService: ReceiptCreatorService) {
    this.subscription = paymentService.paymentClosed$
      .subscribe(value => {
        if (value === 1)
          this.showModal();
        else {
          this.showModal();
          this.clearTa();
        }
      });
  }

  ngOnInit() {
    this.fillData();
    this.recountTotal();
  }
  ngOnChanges(changes: SimpleChanges) {
    alert("Wykrywam Zmiany");
  }
  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
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
    this.transactionSenderService.sendTransaction(this.transactions[this.selectedTa]).subscribe(resp => {
      console.log(resp);
    });
    console.log(this.receiptCreatorService.createReceipt(this.transactions[this.selectedTa]));
    //this will be refactored. If closing ta then just remove it.
    this.transactions.splice(this.selectedTa, 1);
    //then add new clean one
    this.selectedTa = 0;
    this.transactions.push(new Transaction);
    this.products = this.transactions[this.selectedTa].products;
    this.category = undefined;
    //inform tabs that they should refresh
    this.tabsService.announceTabChange(this.transactions[this.selectedTa].name)
    this.recountTotal();
  }
  showModal(): void {
    this.isModalVisible = !this.isModalVisible;
  }

}
