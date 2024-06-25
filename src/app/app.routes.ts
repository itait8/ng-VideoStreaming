import { Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { ChannelComponent } from './Components/channel/channel.component';
import path from 'path';

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
    path: '**',
    redirectTo: 'Home',
  },
];
