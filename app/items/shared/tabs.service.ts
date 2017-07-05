import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class TabsService{
    private tabModifiedSource = new Subject<string>();
    tabModified$ = this.tabModifiedSource.asObservable();

    announceTabChange(tab:string){
        this.tabModifiedSource.next(tab);
    }
}