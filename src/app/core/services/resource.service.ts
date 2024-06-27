import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {
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

    getResources(): Observable<any> {
      return this.http.get(this.url + this.api + 'resource/allByList');
    }
  
    postResource(resource: any): Observable<any> {
  
      return this.http.post(this.url + this.api + 'resource', resource);
  
    }
  
    getResource(id: number): Observable<any>{
      return this.http.get(this.url + this.api + 'resource/' + id);
    }

    patchResource(resource: any): Observable<any>{
      return this.http.patch(this.url + this.api + 'resource', resource)
    }
  
    deleteResource(id:number): Observable<any>{
      return this.http.delete(this.url + this.api + 'resource/' + id)
    }
  
}
