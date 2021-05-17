import { Component, OnInit, OnDestroy} from "@angular/core";
import { ICustomer } from './product';
import { ProductService } from "./product.service";
import { Subscription } from 'rxjs';
import { Icu } from "@angular/compiler/src/i18n/i18n_ast";


@Component({
    selector: 'pm-products',
    templateUrl: './products-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
    pageTitle: string = "Product List";
    imageWidht: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    errorMessage = '';
    sub!: Subscription;
    customerList: ICustomer[] = [];
    //customers: ICustomer = {} as ICustomer;
    customers: ICustomer[] = [];
    categoryName: string = "";

    constructor(private productService: ProductService) {}
    private _listFilter: string ='';
    private _listFilterName: string ='';

    get listFilter(): string {
        return this._listFilter;
    }
    set listFilter(value: string) {
        this._listFilter = value;
        console.log(this._listFilter);
        this.customerList = this.performFilterCustomer(value);
    }

    get listFilterName(): string {
        return this._listFilterName;
    }

    set listFilterName(value: string) {
        this._listFilterName = value;
        console.log(this._listFilterName);
        this.customerList = this.performFilterName(value);
    }
    getAllCustomers(){
        this.productService.getAllCustomers().subscribe( 
            customer => { this.customerList = customer;
            console.log(this.customerList);
        })
    }

    getCustomerByCategory(category: string){
        this.productService.getCustomerByCategory(category).subscribe( 
            customer => { this.customerList = customer;
            console.log(this.customerList);
        })
    }

    performFilterCustomer(filterBy: string): ICustomer[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.customerList.filter((customer: ICustomer)=>
            customer.customerCategoryName.toLocaleLowerCase().includes(filterBy));
    }

    performFilterName(filterBy: string): ICustomer[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.customerList.filter((customer: ICustomer)=>
            customer.customerName.toLocaleLowerCase().includes(filterBy));
    }

    toggleImage():void{
        this.showImage = !this.showImage;
    }

    ngOnInit(): void {
        this.sub = this.productService.getAllCustomers().subscribe({
          next: customer => {
            this.customers = customer;          },
          error: err  => this.errorMessage = err
        });
      }
    
      ngOnDestroy(): void {
        this.sub.unsubscribe();
      }
    
}