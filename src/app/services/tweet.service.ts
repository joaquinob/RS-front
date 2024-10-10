import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Tweet } from '../interfaces/tweet';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TweetService {
  url: string = 'localhost:3000';
  constructor(private http: HttpClient, private authService: AuthService) {}

  private getAuthHeaders(): HttpHeaders{
    const user = this.authService.getUserCookie();
    const token = user ? user.token : null;
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getAllTweets(){
    return this.http.get(this.url)
  }

  getTweetById(id: string) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.user?.token}`
    })

    return this.http.get(`${this.url}/${id}`, {headers})
  }

  addTweet(tweet: Tweet): Observable<Tweet>{
    const headers = new HttpHeaders ({
      'Authorization': `Bearer ${this.authService.user?.token}`
    })

    return this.http.post<Tweet>(this.url, tweet, {headers})
  }
}
