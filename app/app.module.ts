import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TotalComponent } from './total/total.component';
import { BoughtItem } from './items/bought-item/bought-item.component';
import { BoughtItemList } from './items/bought-item-list/bought-item-list.component';
import { ItemService } from './items/shared/item.service';
import { ItemList } from './items/item-list/item-list.component';
import { AppRoutingModule } from './app-routing.module';
import { MainComponent } from './main.component';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth-guard.service';
import { LoginComponent } from './login/login.component';
import { Categories } from './items/categories/categories.component';
import { CategoryService } from './items/shared/category.service';
import { Tabs } from './items/shared/tabs.component';
import { Tab } from './items/shared/tab.component';
import { TabsService } from './items/shared/tabs.service';
import { PaymentComponent } from './payment/payment.component';
import { PaymentService } from './payment/payment.service';
import { TransactionSenderService } from './items/shared/transactionSender.service';
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule
  ],
  declarations: [
    AppComponent,
    TotalComponent,
    BoughtItem,
    BoughtItemList,
    ItemList,
    LoginComponent,
    MainComponent,
    Categories,
    Tab,
    Tabs,
    PaymentComponent
  ],
  bootstrap: [AppComponent],
  providers: [AuthService, AuthGuard, ItemService, CategoryService, TabsService, PaymentService, TransactionSenderService],
})
export class AppModule { }
