import { Component } from '@angular/core';
import { DynamoDBService } from '../../Services/dynamo-dbservice.service';
import { IUser } from '../../Models/User.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  private MockUser:IUser = {
    DisplayName: "test Name",
  Email: "test Email",
  PhotoURL: "test PhotoURL",
  Uid: "test uid",
  UploadedVideos: [null],
  Favorites: [null]

  }
  constructor(private dynamoDB:DynamoDBService){
    dynamoDB.putItem('Users',this.MockUser).then((res) => console.log(res)).catch(err=>console.log(err));
  }

}
