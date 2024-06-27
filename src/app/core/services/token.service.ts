import { Injectable } from '@angular/core';
// import { CookieService } from 'ngx-cookie-service';
// import jwtDecode, {JwtPayload} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private readonly TOKEN_KEY = 'auth_token';

  constructor(
    // private cookieService: CookieService
  ) { }

  saveToken(token: string){
    // this.cookieService.set(
    //   'Authorization',
    //   `Bearer ${token}`,
    //   undefined,
    //   '/',
    //   undefined,
    //   true,
    //   'Strict'
    // )
    localStorage.setItem(this.TOKEN_KEY, token);
  }
  getToken(){
    // const token = this.cookieService.get('Authorization');
    const token = localStorage.getItem(this.TOKEN_KEY);
    return token;
  }
  removeToken(){
    // this.cookieService.delete('Authorization','/');
    localStorage.removeItem(this.TOKEN_KEY);
  }

  // isValidToken(){
  //   const token = this.getToken();
  //   if(!token){
  //     return false;
  //   }
  //   const decodeToken = jwtDecode<JwtPayload>(token);
  //   if(decodeToken && decodeToken?.exp){
  //     const tokenDate = new Date(0);
  //     tokenDate.setUTCSeconds(decodeToken.exp);
  //     const today = new Date();
  //     return tokenDate.getTime() > today.getTime();
  //   }
  //   return false
  // }
  

}
