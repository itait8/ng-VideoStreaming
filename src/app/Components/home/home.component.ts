import { Component, OnInit } from '@angular/core';
import { IUser } from '../../Models/User.interface';
import { DynamoDBService } from '../../Services/dynamo-dbservice.service';
import { IMetadata } from '../../Models/Metadata..interface';
import { MaterialModule } from '../../Material/Material.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PreviewComponent } from '../preview/preview.component';

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

  constructor(private DynamoDBService: DynamoDBService) {
    this.DynamoDBService.getMetaData().subscribe((data) => {
      this.MDs = data;
    });
  }

  ngOnInit(): void {}

  public checkIfFavorite(metadata: IMetadata): boolean {
    return this.MockUser.Favorites.includes(metadata.uId);
  }
}
