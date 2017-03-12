import { NgModule } from '@angular/core';
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
import { AuthService} from './auth.service';
import { AuthGuard} from './auth-guard.service';
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    TotalComponent,
    BoughtItem,
    BoughtItemList,
    ItemList,
    LoginComponent,
    MainComponent
  ],
  bootstrap: [AppComponent],
  providers: [AuthService,AuthGuard,ItemService]
})
export class AppModule { }
