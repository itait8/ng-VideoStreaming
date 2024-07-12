import { Injectable } from '@angular/core';
import {
  CognitoIdentityProviderClient,
  UpdateUserAttributesCommand,
  GetUserCommand,
  GetUserCommandOutput,
} from '@aws-sdk/client-cognito-identity-provider';
import { IUser, emptyUser } from '../Models/User.interface';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { COGNITO_CONFIG } from '../../enviroment/emviroment';
import { IMetadata } from '../Models/Metadata..interface';
import { S3Service } from './s3.service';
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggenIn$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private cognitoClient: CognitoIdentityProviderClient;
  private userDetails$: Subject<IUser> = new Subject<IUser>();
  private user: IUser = emptyUser;
  private Tokens: { accessToken: string; idToken: string } = {
    accessToken: '',
    idToken: '',
  };

  constructor(private router: Router, private s3Service: S3Service) {
    this.cognitoClient = new CognitoIdentityProviderClient({
      region: COGNITO_CONFIG.REGION,
    });
  }

  public loginPage(): void {
    window.location.href =
      'https://video-streaming-user-pool.auth.eu-north-1.amazoncognito.com/login?client_id=6gad5tgoq2r3i51t3imauusr4r&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=http://localhost:4200/Home';
    this.isLoggenIn$.next(true);
  }

  public isLoggedIn() {
    return this.isLoggenIn$.asObservable();
  }

  public logOut(): void {
    this.isLoggenIn$.next(false);
    this.Tokens = { accessToken: '', idToken: '' };
    this.user = emptyUser;
  }

  private setTokens(url: string): void {
    const parsedUrl = this.router.url.split(/[#&=]/);
    const idToken =
      parsedUrl[parsedUrl.findIndex((attr) => attr == 'id_token') + 1];
    const accessToken =
      parsedUrl[parsedUrl.findIndex((attr) => attr == 'access_token') + 1];
    this.Tokens = { accessToken, idToken };
  }

  public login(): void {
    this.setTokens(this.router.url);

    const input = {
      AccessToken: this.Tokens.accessToken,
    };
    const command = new GetUserCommand(input);

    this.cognitoClient
      .send(command)
      .then((res) => {
        this.setUser(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  private setUser(getUserCommantOutput: GetUserCommandOutput): void {
    getUserCommantOutput.UserAttributes?.forEach((attribute) => {
      if (attribute.Value)
        switch (attribute.Name) {
          case 'custom:favoritesVideos':
            this.user.Favorites = attribute.Value.split(',');
            break;
          case 'name':
            this.user.DisplayName = attribute.Value;
            break;
          case 'custom:uploadedVideos':
            this.user.UploadedVideos = attribute.Value.split(',');
            break;
          case 'email':
            this.user.email = attribute.Value;
            break;
          case 'picture':
            this.user.PhotoURL = attribute.Value;
            break;
          case 'sub':
            this.user.uId = attribute.Value;
            break;
        }
    });
    this.isLoggenIn$.next(true);
    this.userDetails$.next(this.user);
    console.log(this.user);
    console.log(this.userDetails$);
    //this.router.navigate(['/Home']);
  }

  public getUser(): Observable<IUser> {
    return this.userDetails$.asObservable();
  }

  public updateUser(name: string, value: string): void {
    const input = {
      UserAttributes: [{ Name: name, Value: value }],
      AccessToken: this.Tokens.accessToken,
    };

    const command = new UpdateUserAttributesCommand(input);
    this.cognitoClient
      .send(command)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  public addFavorite(videoURL: string): void {
    this.updateUser(
      'custom:favoritesVideos',
      videoURL + ', ' + (this.user.Favorites || [])
    );
    console.log(this.user.Favorites);
  }

  public removeFavorite(videoURL: string): void {
    if (
      this.user.Favorites?.findIndex((favorite) => favorite == videoURL) != -1
    )
      this.updateUser(
        'custom:favoritesVideos',
        this.user.Favorites?.filter((favorite) => favorite != videoURL).join(
          ', '
        ) || ''
      );
    console.log(this.user.Favorites);
  }

  public getUserId() {
    return this.user.uId;
  }
  public async uploadVideo(metadata: IMetadata, video: any) {
    this.s3Service.uploadVideo(video);
    console.log(metadata);
  }
}
