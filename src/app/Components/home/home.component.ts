import { Component, OnInit } from '@angular/core';
import { IUser } from '../../Models/User.interface';
import { DynamoDBService } from '../../Services/dynamo-dbservice.service';
import { IMetadata } from '../../Models/Metadata..interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private MockUser: IUser = {
    DisplayName: 'test Name',
    Email: 'test Email',
    PhotoURL: 'test PhotoURL',
    Uid: 'test uid',
    UploadedVideos: [null],
    Favorites: [null],
  };

  private metadata: Array<IMetadata> | undefined;

  constructor(private DynamoDBService: DynamoDBService) {
    this.DynamoDBService.getMetaData().subscribe((data) => {
      this.metadata = data;
    });
  }

  ngOnInit(): void {
    console.log(this.metadata);
  }
}
