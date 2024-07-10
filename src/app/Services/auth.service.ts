import { Injectable } from '@angular/core';
import {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
} from '@aws-sdk/client-cognito-identity-provider';
import { IUser } from '../Models/User.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { COGNITO_CONFIG } from '../../enviroment/emviroment';
import { HttpClient } from '@angular/common/http';
import * as jwt from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggenIn$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  private cognitoClient: CognitoIdentityProviderClient;
  private userDetails$: Subject<IUser> = new Subject<IUser>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {
    this.cognitoClient = new CognitoIdentityProviderClient({
      region: COGNITO_CONFIG.REGION,
    });
  }

  async exchangeCodeForTokens(
    code: string
  ): Promise<{ idToken: string; accessToken: string }> {
    const command = new InitiateAuthCommand({
      AuthFlow: 'REFRESH_TOKEN',
      ClientId: COGNITO_CONFIG.COGNITO_CLIENT_ID,
      AuthParameters: {
        CODE: code,
        REDIRECT_URI: COGNITO_CONFIG.COGNITO_REDIRECT_URL,
      },
    });

    try {
      console.log(command);
      const response = await this.cognitoClient.send(command);
      console.log(response);
      const idToken = response.AuthenticationResult?.IdToken;
      console.log(idToken);
      const accessToken = response.AuthenticationResult?.AccessToken;
      console.log(accessToken);

      if (idToken && accessToken) {
        return { idToken, accessToken };
      } else {
        throw new Error('Failed to exchange code for tokens');
      }
    } catch (error) {
      console.error('Error exchanging code for tokens:', error);
      throw error;
    }
  }

  decodeIdToken(idToken: string): any {
    try {
      return jwt.jwtDecode(idToken);
    } catch (error) {
      console.error('Error decoding ID token:', error);
      throw error;
    }
  }

  public loginPage(): void {
    window.location.href =
      'https://video-streaming-user-pool.auth.eu-north-1.amazoncognito.com/login?client_id=6gad5tgoq2r3i51t3imauusr4r&response_type=token&scope=email+openid+phone&redirect_uri=http://localhost:4200/Home';
    this.isLoggenIn$.next(true);
  }

  public isLoggedIn() {
    return this.isLoggenIn$.asObservable();
  }
  public logOut(): void {
    this.isLoggenIn$.next(false);
  }

  public getToken() {}
}
