import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactserService } from 'projects/storefront/src/app/contactser.service';
import { Observable } from 'rxjs';
import { theme } from '../../../../../data/theme';
import { Contact } from './contact';

@Component({
    selector: 'app-page-contact-us-one',
    templateUrl: './page-contact-us-one.component.html',
    styleUrls: ['./page-contact-us-one.component.scss'],
})
export class PageContactUsOneComponent {
    theme = theme;
    contactForm = new FormGroup({
       name : new FormControl('',[Validators.required, Validators.minLength(3), Validators.pattern("[a-zA-Z ]*"), Validators.maxLength(255)]) ,
       email: new FormControl('',[
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
       subject: new FormControl('',[Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
       message: new FormControl('',[Validators.required, Validators.minLength(10), Validators.maxLength(255)])
      });

      
      get name(){
        return this.contactForm.get('name')
      }
      get email(){
        return this.contactForm.get('email')
      }
      get subject(){
        return this.contactForm.get('subject')
      }
      get message(){
        return this.contactForm.get('message')
      }
    constructor(private _contact:ContactserService) { }

    

    // private _url = "http://localhost:5000/";
    // public contact(EmailId:string,Message:any,Name:string,Subject:string):Observable<any>{
    //   return this._http.post<any>(`${this._url+'contact'}/${EmailId}/${Message}/${Name}/${Subject}`,this.httpOptions);
    // }
    // httpOptions<T>(arg0: string, httpOptions: any): Observable<any> {
    //   throw new Error('Method not implemented.');
    // }
    Name:string=null;
    Subject:string=null;
    Emailid:string=null;
    Message:any=null;
    
    
  contact(){
    this.Name=this.Name
    this._contact.addContactMsg( this.Emailid, this.Message,this.Name,this.Subject).subscribe(data => {
       
      console.log(this.Name+" "+this.Subject+" "+this.Emailid+" "+this.Message);
      alert("Message successfully sent");
  
  });
  
  }
 
}
