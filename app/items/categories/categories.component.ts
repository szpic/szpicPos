import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Category } from '../shared/category';
import { CategoryService } from '../shared/category.service';

@Component({
    moduleId: module.id,
    selector: 'category',
    templateUrl: 'categories.component.html'
})
export class Categories {
    categories: Category[];
    subcriber: any;
    constructor(private itemService: CategoryService) {

    }
    @Input() products: Category[];
    @Output() categoryChanged = new EventEmitter();
    ngOnInit() {
        this.getCategories();
    }
    getCategories(): void {
        this.subcriber = this.itemService.getCategories()
            .subscribe(data => {
                if (!!data) {
                    this.categories = new Array<Category>();
                    data.forEach(element => {
                        var x = new Category();
                        x.category = element.toString();
                        this.categories.push(x);
                    });
                }
            })
    }
    changeCategory(category: Category): void {
        this.categoryChanged.emit(category);
    }

    public ngOnDestroy(): void {
        this.subcriber.unsubscribe();
    }
}