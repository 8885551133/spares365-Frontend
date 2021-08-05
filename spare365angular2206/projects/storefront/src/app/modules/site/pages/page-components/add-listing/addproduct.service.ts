import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Addproduct } from './addproduct';

@Injectable({
  providedIn: 'root'
})
export class AddProductService {
  loginUserFromRemote(loginUser: any) {
      throw new Error('Method not implemented.');
  }
  upload(file: File) {
    throw new Error('Method not implemented.');
  }

  constructor(private _http: HttpClient) { }

  public addproductFromRemote(Addproduct: Addproduct): Observable<any> {
    return this._http.post<any>("http://spares365-env.eba-e2eubpyu.us-east-2.elasticbeanstalk.com/addproduct", Addproduct);
  }

  public listProductByNameFromRemote(name: string): Observable<any> {
    return this._http.post<any>("http://spares365-env.eba-e2eubpyu.us-east-2.elasticbeanstalk.com/product/", name);
  }

  public listAllProductsFromRemote(): Observable<any> {
    return this._http.get<any>("http://spares365-env.eba-e2eubpyu.us-east-2.elasticbeanstalk.com/findallproducts");
  }
  
  public placeOrder(){
    return this._http.get<any>("http://localhost:5000/place_Order");
    
    //return this._http.get<any>("https://reqres.in/api/users?page=2");
 }
}