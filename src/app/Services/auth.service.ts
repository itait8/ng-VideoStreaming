import { Injectable } from '@angular/core';
import { IUser } from '../Models/User.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isUserLoggedIn: boolean = false;

  constructor() { }

  private getUsers(){

  }

  public addUser(newUser:IUser):void{
  }

  public validateUser(user:IUser):boolean{
    //add varification
    return true;
  }
  
}
