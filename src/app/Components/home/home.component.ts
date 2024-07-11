import { Component, OnInit } from '@angular/core';
import { IUser } from '../../Models/User.interface';
import { DynamoDBService } from '../../Services/dynamo-dbservice.service';
import { IMetadata } from '../../Models/Metadata..interface';
import { MaterialModule } from '../../Material/Material.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PreviewComponent } from '../preview/preview.component';
import { VideoService } from '../../Services/video.service';
import { AuthService } from '../../Services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as jwt from 'jwt-decode';
import {
  CognitoIdentityProviderClient,
  UpdateUserAttributesCommand,
} from '@aws-sdk/client-cognito-identity-provider';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [MaterialModule, FormsModule, CommonModule, PreviewComponent],
})
export class HomeComponent implements OnInit {
  public MockUser: IUser = {
    DisplayName: 'test Name',
    Email: 'test Email',
    PhotoURL: 'test PhotoURL',
    uId: 'test uid',
  };

  public MDs: Array<IMetadata> = [];
  public numOfColumns: number = 4;

  constructor(
    private videoService: VideoService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    authService.getUser().subscribe((user) => {
      this.MockUser = user;
    });
    this.videoService.getMetadata()?.subscribe((data) => {
      this.MDs = data;
    });
  }

  ngOnInit(): void {
    this.authService.getToken()?.subscribe((user) => {
      console.log(user);
      this.MockUser = user;
    });
  }

  public checkIfFavorite(metadata: IMetadata): boolean {
    return this.MockUser.Favorites?.includes(metadata.uId) || false;
  }
}
