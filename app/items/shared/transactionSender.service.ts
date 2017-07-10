import { Injectable} from '@angular/core';
import { Http, Response,Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { Transaction } from './transaction'
import { Login} from '../../login/login';

@Injectable()
export class TransactionSenderService{
    constructor(private http:Http){}
    private url = 'http://localhost:3000/transaction/save/';

    sendTransaction(ta: Transaction) : Observable<Login>{
        let bodyString = JSON.stringify(ta);
        let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options       = new RequestOptions({ headers: headers }); // Create a request option
        return this.http.post(this.url,{ta},options)
        .map(this.extractData)
        .catch(this.handleError);
    }

     private extractData(res: Response) {
        let body = <Login>res.json();
        return body || {};
    }
    private handleError(error: Response | any) {
        // In a real world app, you might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}