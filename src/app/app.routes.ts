import { Routes } from '@angular/router';
import { ProfileComponent } from './components/comps/profile/profile.component';
import { HomeComponent } from './components/comps/home/home.component';
import { SearchComponent } from './components/comps/search/search.component';
import { NewTweetComponent } from './components/comps/new-tweet/new-tweet.component';
import { LikesComponent } from './components/comps/likes/likes.component';
import { LoginComponent } from './components/comps/login/login.component';

export const routes: Routes = [
    {
        path: "",
        component: HomeComponent
    },
    {
        path: "id",
        component: ProfileComponent
    },
    {
        path: 'logIn',
        component: LoginComponent
    },
    {
        path: "search",
        component: SearchComponent
    },
    {
        path: "new",
        component: NewTweetComponent
    },
    {
        path: "likes",
        component: LikesComponent
    }
];
