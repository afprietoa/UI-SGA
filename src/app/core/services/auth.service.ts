import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TokenService } from './token.service';
import { Observable, tap } from 'rxjs';
import { JwtResponseDto, ResponseLogin } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  
  private url = environment.url_security;
  private loginApi = 'auth/login';
  private refreshApi = 'auth/refresh';
  private profileApi = 'auth/profile';

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
    ) { }

  login(email: string, password: string): Observable<ResponseLogin>{
    var body = { "email": email, "password": password }
    return this.http.post<ResponseLogin>(this.url + this.loginApi , body)
    .pipe(
      tap(response =>{
        this.tokenService.saveToken(response.token);
      })
    );
  }

  refreshToken(): Observable<JwtResponseDto> {
    const token = this.tokenService.getToken();
    const body = { token };
    return this.http.post<JwtResponseDto>(`${this.url}${this.refreshApi}`, body)
      .pipe(
        tap(response => {
          this.tokenService.saveToken(response.token);
        })
      );
  }

  getProfile(): Observable<any> {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.url}${this.profileApi}`, { headers });
  }

  logout(){
    this.tokenService.removeToken()
  }

  grantAccess(){
    return this.tokenService.getToken();
  }
}
