import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactserService {

  constructor(private _http: HttpClient) { }

  private _url = "http://spares365-env.eba-e2eubpyu.us-east-2.elasticbeanstalk.com/";
  public addContactMsg(EmailId: string, Message: any, Name: string, Subject: string): Observable<any> {
    return this._http.post<any>(`${this._url + 'contact'}/${EmailId}/${Message}/${Name}/${Subject}`, this.httpOptions);
  }
  httpOptions<T>(arg0: string, httpOptions: any): Observable<any> {
    throw new Error('Method not implemented.');
  }
}
