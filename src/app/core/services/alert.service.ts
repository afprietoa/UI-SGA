import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private url = environment.url_base;
  private api = environment.api_base;
  // httpOptions = {
  //   headers: new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': 'Bearer ' + environment.token
  //   })
  // }
    constructor(
      private http: HttpClient
    ) { }

    getAlerts(): Observable<any> {
      return this.http.get(this.url + this.api + 'alert/allByList');
    }
  
    postAlert(alert: any): Observable<any> {
  
      return this.http.post(this.url + this.api + 'alert', alert);
  
    }
  
    getAlert(id: number): Observable<any>{
      return this.http.get(this.url + this.api + 'alert/' + id);
    }

    patchAlert(alert: any): Observable<any>{
      return this.http.patch(this.url + this.api + 'alert', alert)
    }
  
    deleteAlert(id:number): Observable<any>{
      return this.http.delete(this.url + this.api + 'alert/' + id)
    }
}
