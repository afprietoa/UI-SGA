import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class MeasurementService {
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

    getMeasurements(): Observable<any> {
      return this.http.get(this.url + this.api + 'measurement/allByList');
    }
  
    postMeasurement(measurement: any): Observable<any> {
  
      return this.http.post(this.url + this.api + 'measurement', measurement);
  
    }
  
    getMeasurement(id: number): Observable<any>{
      return this.http.get(this.url + this.api + 'measurement/' + id);
    }

    patchMeasurement(measurement: any): Observable<any>{
      return this.http.patch(this.url + this.api + 'measurement', measurement)
    }
  
    deleteMeasurement(id:number): Observable<any>{
      return this.http.delete(this.url + this.api + 'measurement/' + id)
    }
}
