import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PollutantService {
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

    getPollutants(): Observable<any> {
      return this.http.get(this.url + this.api + 'pollutant/allByList');
    }
  
    postPollutant(pollutant: any): Observable<any> {
  
      return this.http.post(this.url + this.api + 'pollutant', pollutant);
  
    }
  
    getPollutant(id: number): Observable<any>{
      return this.http.get(this.url + this.api + 'pollutant/' + id);
    }

    patchPollutant(pollutant: any): Observable<any>{
      return this.http.patch(this.url + this.api + 'pollutant', pollutant)
    }
  
    deletePollutant(id:number): Observable<any>{
      return this.http.delete(this.url + this.api + 'pollutant/' + id)
    }
}
