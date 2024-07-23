import { Component, OnDestroy, OnInit } from '@angular/core';
import { PreviewComponent } from '../preview/preview.component';
import { IMetadata } from '../../Models/Metadata..interface';
import { AuthService } from '../../Services/auth.service';
import { DynamoDBService } from '../../Services/dynamo-dbservice.service';
import { MaterialModule } from '../../Material/Material.module';
import { CommonModule } from '@angular/common';
import { ImageFileData } from 'aws-sdk/clients/iotsitewise';
import { emptyUser, IUser } from '../../Models/User.interface';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [PreviewComponent, MaterialModule, CommonModule],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
})
export class FavoritesComponent implements OnInit, OnDestroy {
  public favoritesId: Array<string> = [];
  public favorites: Array<IMetadata> = [];
  public user: IUser = emptyUser;
  constructor(
    private authService: AuthService,
    private dynamoDBService: DynamoDBService
  ) {}

  ngOnInit(): void {
    this.favorites = this.authService.getFavorites();
    console.log(this.favorites);
  }

  ngOnDestroy() {
    this.favoritesId = [];
    this.favorites = [];
  }
}
