import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as AWS from 'aws-sdk';

@Injectable({
  providedIn: 'root',
})
export class CognitoService {


  constructor() {



  }
  public signinCallback(authResult:any) {
    if (authResult['status']['signed_in']) {
  
       // Add the Google access token to the Amazon Cognito credentials login map.
       AWS.config.credentials = new AWS.CognitoIdentityCredentials({
          IdentityPoolId: 'eu-north-1_UycprTKYo',
          Logins: {
             'accounts.google.com': authResult['id_token']
          }
       });
    }
  }
  public signUp() {
  }
}
