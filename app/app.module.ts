import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TotalComponent } from './total/total.component';
import { BoughtItem } from './items/bought-item/bought-item.component';
import { BoughtItemList } from './items/bought-item-list/bought-item-list.component';
import { ItemService } from './items/shared/item.service';
import { ItemList} from './items/item-list/item-list.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    TotalComponent,
    BoughtItem,
    BoughtItemList,
    ItemList
  ],
  bootstrap: [AppComponent],
  providers:[ItemService]
})
export class AppModule { }
