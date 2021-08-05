import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserinfoService {

  user: User;
  userEmail: string ;
  
  constructor() {    
   }

   updateUser(): void {
    this.userEmail = this.user.email
   }
}
