import { Component } from '@angular/core';
import { MaterialModule } from '../../Material/Material.module';
import { FavoritesComponent } from '../favorites/favorites.component';
import { UploadedComponent } from '../uploaded/uploaded.component';

@Component({
  selector: 'app-channel',
  standalone: true,
  imports: [MaterialModule, FavoritesComponent, UploadedComponent],
  templateUrl: './channel.component.html',
  styleUrl: './channel.component.scss',
})
export class ChannelComponent {}
