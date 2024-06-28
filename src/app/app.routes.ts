import { Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { ChannelComponent } from './Components/channel/channel.component';
import { PlayerComponent } from './Components/player/player.component';

export const routes: Routes = [
  {
    path: 'Home',
    component: HomeComponent,
  },
  {
    path: 'Channel',
    component: ChannelComponent,
  },
  {
    path: 'Video',
    component: PlayerComponent,
    children: [
      {
        path: '**',
        component: PlayerComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'Home',
  },
];
