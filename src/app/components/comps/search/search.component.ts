import { Component } from '@angular/core';
import { FilterPipe } from '../../../pipes/filter.pipe';
import { Tweet } from '../../../interfaces/tweet';
import { TweetService } from '../../../services/tweet.service';
import { AuthService } from '../../../services/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FilterPipe, RouterModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  tweets: Tweet[] = [];
  filtro: string = '';

  constructor(private tweetService: TweetService, public authService: AuthService){
    tweetService.getAllTweets().subscribe({
      next:(response) => {
        this.tweets = response as Tweet[]
      },
      error: () => {}
    })
  }
}
