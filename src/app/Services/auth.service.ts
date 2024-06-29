import { Injectable } from '@angular/core';

import { IUser } from '../Models/User.interface';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggenIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  private userDetails$: Subject<IUser> = new Subject<IUser>();
  private userId: string = '';

  constructor(private router: Router) {
    if (typeof localStorage != 'undefined') {
      const savedUserString = localStorage.getItem('user');
      if (savedUserString != null) this.isLoggenIn$.next(true);
    }
  }

  public signInWithGoogle() {
    //add sign in with google
  }

  public signOut(): Promise<void> {
    return Promise.resolve();
    //add sign out
  }

  public isLoggenIn(): Observable<boolean> {
    return this.isLoggenIn$.asObservable();
  }

  public getUserData(): Observable<IUser> {
    return this.userDetails$.asObservable();
  }

  private authLogin() {
    //login
  }

  private setUserData(user?: IUser): Promise<void> | void {
    //insetring new user to db
    return Promise.resolve();
  }
}
