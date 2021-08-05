import { Injectable } from '@angular/core';
import { Addproduct } from '../modules/site/pages/page-components/add-listing/addproduct';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  products: Addproduct[];

  constructor() { }

}
