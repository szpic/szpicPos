import {Component, Input, OnInit} from '@angular/core';
import {Table }from './table';
@Component({
    selector: 'tables',
    templateUrl: 'app/tables/tables.component.html',
    styleUrls: ['app/tables/tables.component.css']
})

export class TablesComponent{
    canvas:HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    constructor(){
        // this.canvas = <HTMLCanvasElement>document.getElementById('canvas');
        // this.ctx = this.canvas.getContext("2d");


    }
    ngOnInit(){
        this.canvas = <HTMLCanvasElement>document.getElementById('canvas');
        this.ctx = this.canvas.getContext("2d");
                //lets print something
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, 300, 300);
        this.ctx.beginPath();
        this.ctx.strokeStyle = "red";
        this.ctx.lineWidth = 5;
        this.ctx.arc(100, 100, 100, 0, 2 * Math.PI);
        this.ctx.stroke();
    }
}