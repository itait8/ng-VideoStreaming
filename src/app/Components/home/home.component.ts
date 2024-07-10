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
    UploadedVideos: [null],
    Favorites: [null],
  };

  public MDs: Array<IMetadata> = [];
  public numOfColumns: number = 4;

  constructor(
    private videoService: VideoService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.videoService.getMetadata()?.subscribe((data) => {
      this.MDs = data;
    });
  }

  ngOnInit(): void {
    /* this.route.queryParams.subscribe(async (params: any) => {
      const code = params['code'];
      console.log('code: ', code);

      if (code) {
        try {
          // Exchange the authorization code for tokens
          const tokens = await this.authService.exchangeCodeForTokens(code);
          console.log('tokens: ', tokens);

          // Decode the ID token and extract user data
          const userData = this.authService.decodeIdToken(tokens.idToken);
          console.log('userData: ', userData);
          // Store user data and update application state
          // this.storeUserData(userData);

          // Redirect to the desired route after successful authentication
          this.router.navigate(['/dashboard']);
        } catch (error) {
          console.error('Authentication failed:', error);
          // Handle authentication error
        }
      } else {
        console.error('Missing code parameter in the redirect URL');
        // Handle missing code parameter error
      }
    }); */

    this.route.queryParams.subscribe((params: any) => {
      const token = params;
      console.log('params: ', params);
      console.log('token: ', token);
      setTimeout(() => console.log('params: ', params), 5000);
    });

    console.log(this.router.url.split(/[#&=]/));
    const parsedUrl = this.router.url.split(/[#&=]/);
    const idToken = parsedUrl[2];
    const accessToken = parsedUrl[4];
    if (idToken) {
      console.log(jwt.jwtDecode(idToken));
    }
  }

  public checkIfFavorite(metadata: IMetadata): boolean {
    return this.MockUser.Favorites.includes(metadata.uId);
  }
}
