import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class ReceiptPrinterService {
    constructor(private http: Http) { }
    private url = "http://localhost:8050/webadapter/deviceinterface";
    private dsm_webSocket: WebSocket;
    private layout: string;
    //settimeout fix:
    private that = this;

    private extractData(res: Response) {
        let body = <any>res.json();
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
    innerPrint(): any {
        
    }

    printReceipt(receipt: string): any { 
        this.layout = receipt;
        this.dsm_webSocket = undefined;
        this.dsm_webSocket = new WebSocket("ws://localhost:8050/webadapter/deviceinterface");
        var that = this;
        setTimeout(function () {
            that.dsm_webSocket.send("[{'clientID':'chrome','deviceID':'DeviceService','requestID':'4347411504445902134','method':'connect','parameters':{'requestrelease':true}}]");
            var onSuccess = function () {
                console.log('sukces')
            }
            var onError = function () {
                console.log('error')
            }

            let bodyString = "[{'clientID':'chrome','deviceID':'POSPrinter',requestID':'945501504439935953','method':'setEnabled','parameters':{'enabled':true}}]";
            let headers = new Headers({'contentType': 'text/plain; charset=UTF-8' });
            let options = new RequestOptions({ method: RequestMethod.Post});
            that.http.post(that.url, bodyString, options)
                .map(that.extractData)
                .catch(that.handleError)
                .subscribe(data => { console.log("test")});


            var data2 = "[{'clientID':'chrome','deviceID':'POSPrinter','requestID':'8800941504440188381','method':'getCapabilities','parameters':{}}]"

            that.http.post(that.url, data2, options).map(that.extractData).catch(that.handleError).subscribe(data => { console.log("test") });

            var data3 = "[{'clientID':'chrome','deviceID':'POSPrinter','requestID':'3775561504440295040','method':'printNormal','parameters':{'station':'2','data':' " + that.layout+"'}}]"


            that.http.post(that.url, data3, options).map(that.extractData).catch(that.handleError).subscribe(data => { console.log("test") });
        }, 500);
    }
}
