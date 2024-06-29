import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Amplify } from 'aws-amplify';
import { enviroment } from '../../enviroment/emviroment';
import { IUser } from '../Models/User.interface';
import * as Auth from 'aws-amplify/auth';

@Injectable({
  providedIn: 'root',
})
export class CognitoService {
  private authenticationSubject: BehaviorSubject<any>;

  constructor() {
    Amplify.configure({
      Auth: enviroment,
    });

    this.authenticationSubject = new BehaviorSubject<boolean>(false);
  }

  public signUp() {
    console.log('redirecting...');

    Auth.signInWithRedirect({ provider: 'Google' }).catch((err) =>
      console.log(err)
    );
  }
}
