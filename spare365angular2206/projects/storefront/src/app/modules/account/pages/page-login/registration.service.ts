import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  
  url: string = "http://spares365-env.eba-e2eubpyu.us-east-2.elasticbeanstalk.com/"; //"http://spares365-env.eba-e2eubpyu.us-east-2.elasticbeanstalk.com/" "http://localhost:5000/";
  //url:string = "http://localhost:5000/";
  constructor(private _http: HttpClient) { }

  public loginUserFromRemote(user: User): Observable<any> {
    return this._http.post<any>(this.url + "login", user);
  }

  public registerUserFromRemote(user: User): Observable<any> {
    return this._http.post<any>(this.url + "registeruser", user);
  }

  public validateOTP(user: User): Observable<any> {
    return this._http.post<any>(this.url + "validate", user);
  }

  public forgotPassword(user: User): Observable<any> {
    return this._http.post<any>(this.url + "forgot_password", user);
  }

  public resetPassword(user: User): Observable<any> {
    return this._http.post<any>(this.url + "reset_password", user);
  }

 
}
