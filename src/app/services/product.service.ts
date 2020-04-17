import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {Product} from '../models/product';
import {BehaviorSubject, Observable} from 'rxjs';
import {UserService} from './user.service';

@Injectable()
export class ProductService {

  productList: AngularFireList<any>;
  private readonly currentProductSubject = new BehaviorSubject<Product>(null);
  selectedProduct: Product = new Product();


  constructor(
    private firebase: AngularFireDatabase,
    private auth: UserService
  ) {
  }

  getProducts(): AngularFireList<any> {
    return this.productList = this.firebase.list('products');
  }

  insertProduct(product: Product): void {
    this.productList.push({
      name: product.name,
      category: product.category,
      location: product.location,
      price: product.price,
      user: this.auth.currentUser.email
    });
  }

  updateProduct(product: Product): void {
    this.productList.update(product.key, {
      name: product.name,
      category: product.category,
      location: product.location,
      price: product.price,
      user: this.auth.currentUser.email
    });
  }

  deleteProduct(key: string) {
    this.productList.remove(key);
  }

  changeProduct(product: Product): void {
    this.currentProductSubject.next(product);
  }

  public get currentProduct(): Observable<Product> {
    return this.currentProductSubject.asObservable();
  }

}
