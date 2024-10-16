import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { HttpClient} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User | null = null;
  url: string = "http://localhost:3000"

  constructor(private http: HttpClient, private cookieService: CookieService) {
    if(cookieService.check('user')){
      this.user = JSON.parse(cookieService.get('user'))
    }
  }

  signup(username: string, email: string, password: string){
    return this.http.post(`${this.url}/signup`,
    {
      username: username,
      email: email,
      password: password
    })
  }

  login(username: string, password: string){
    return this.http.post(`${this.url}/login`, {
      username : username,
      password: password
    })
  }

  saveUser(user: User){
    this.user = user;
    this.cookieService.set('user',JSON.stringify(user))
  }

  getUserCookie(): User | null {
    if(this.user === null && this.cookieService.check('user')){
      this.user = JSON.parse(this.cookieService.get('user'))
    }
    return this.user
  }
}
