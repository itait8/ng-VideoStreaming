import { Injectable } from '@angular/core';
import {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
  UpdateUserAttributesCommand,
  GetUserAttributeVerificationCodeCommand,
  GetUserCommand,
} from '@aws-sdk/client-cognito-identity-provider';
import { IUser } from '../Models/User.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { COGNITO_CONFIG } from '../../enviroment/emviroment';
import { HttpClient } from '@angular/common/http';
import * as jwt from 'jwt-decode';
import { JwtPayload } from 'jwt-decode';
import { access } from 'fs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggenIn$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private cognitoClient: CognitoIdentityProviderClient;
  private userDetails$: Subject<IUser> = new Subject<IUser>();
  private accessToken: string = '';

  constructor(private router: Router) {
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
  }

  public getTokens(url: string): { accessToken: string; idToken: string } {
    const parsedUrl = this.router.url.split(/[#&=]/);
    console.log(parsedUrl);
    const idToken = parsedUrl[2];
    const accessToken = parsedUrl[4];
    return { accessToken, idToken };
  }

  public login(): void {
    const Tokens = this.getTokens(this.router.url);
    const idToken = Tokens.idToken;
    this.accessToken = Tokens.accessToken;
    /*   if (idToken) {
      this.isLoggenIn$.next(true);
      const decodedToken: any = jwt.jwtDecode(idToken);
      var userData: IUser = {
        DisplayName: decodedToken['name'],
        email: decodedToken['email'],
        PhotoURL: decodedToken['picture'],
        uId: decodedToken.sub,
      }; */

    var userData: IUser;
    const input = {
      AccessToken: this.accessToken,
    };
    const command = new GetUserCommand(input);

    this.cognitoClient
      .send(command)
      .then((res) => {
        console.log(res);
        res.UserAttributes?.forEach((attribute) => {
          if (attribute.Value)
            switch (attribute.Name) {
              case 'custom:favoritesVideos':
                userData.Favorites = attribute.Value.split(',');
                break;
              case 'name':
                userData.DisplayName = attribute.Value;
                break;
              case 'custom:uploadedVideos':
                userData.UploadedVideos = attribute.Value.split(',');
                break;
              case 'email':
                console.log(attribute.Value);
                userData.email = attribute.Value;
                console.log(attribute.Value);
                break;
              case 'picture':
                userData.PhotoURL = attribute.Value;
                break;
              case 'sub':
                userData.uId = attribute.Value;
                break;
            }
        });
        this.userDetails$.next(userData);
      })
      .catch((err) => {
        console.log(err);
      });

    //this.router.navigate([`/Home`]);
    //this.updateUser(parsedUrl[4]);
  }

  public getUser(): Observable<IUser> {
    return this.userDetails$.asObservable();
  }

  public getUserAttribute(attribute: string, accessToken: string): void {
    //const commandInput = new
  }
  public updateUser(accessToken: string): void {
    const input = {
      UserAttributes: [{ Name: 'custom:favoritesVideos', Value: '1234' }],
      AccessToken: accessToken,
    };

    const command = new UpdateUserAttributesCommand(input);
    this.cognitoClient
      .send(command)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }
}
