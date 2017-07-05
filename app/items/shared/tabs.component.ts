import { Component, ContentChildren, QueryList, AfterContentInit, Output, EventEmitter, Input, SimpleChanges, OnDestroy } from '@angular/core';
import { Tab } from './tab.component';
import { Transaction } from './transaction';
import { TabsService } from './tabs.service';
import { Subscription }   from 'rxjs/Subscription';

@Component({
    selector: 'tabs',
    template: `
    <ul class="nav nav-tabs">
      <li *ngFor="let tab of tabs" (click)="selectTab(tab)" [class.active]="tab.active">
        <a>{{tab.title}}</a>
      </li>
    </ul>
    <ng-content></ng-content>
  `
})
export class Tabs implements AfterContentInit, OnDestroy {
    @Output() tabChanged = new EventEmitter();
    @ContentChildren(Tab) tabs: QueryList<Tab>;
    subscription: Subscription;

    constructor(private tabsService: TabsService){
        this.subscription = tabsService.tabModified$
        .subscribe(value => {this.activateFirstTab(value)});
    }
    // contentChildren are set
    ngAfterContentInit() {
        // get all active tabs
        let activeTabs = this.tabs.filter((tab) => tab.active);

        // if there is no active tab set, activate the first
        if (activeTabs.length === 0) {
            this.selectTab(this.tabs.first);
        }
    }

    selectTab(tab: Tab) {
        // deactivate all tabs
        this.tabs.toArray().forEach(tab => tab.active = false);

        // activate the tab the user has clicked on.
        tab.active = true;
        // inform main form that we are using other form
        this.changeTab(tab);
    }
 isBigEnough(element:any) {
  return element >= 15;
}
    activateFirstTab(name:string){
        this.selectTab(this.tabs.find(val=>{return val.title===name}));
    }

    changeTab(tab: Tab): void {
        this.tabChanged.emit(tab);
    }

    ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }
}