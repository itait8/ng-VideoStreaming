import { Component, OnInit } from '@angular/core';
import { IUser, emptyUser } from '../../Models/User.interface';
import { IMetadata } from '../../Models/Metadata..interface';
import { MaterialModule } from '../../Material/Material.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PreviewComponent } from '../preview/preview.component';
import { VideoService } from '../../Services/video.service';
import { AuthService } from '../../Services/auth.service';
import { DynamoDBService } from '../../Services/dynamo-dbservice.service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [MaterialModule, FormsModule, CommonModule, PreviewComponent],
})
export class HomeComponent implements OnInit {
  public user: IUser = emptyUser;

  public MDs: Array<IMetadata> = [];
  public numOfColumns: number = 4;

  constructor(
    private videoService: VideoService,
    private authService: AuthService,
    private dynamoDBService: DynamoDBService
  ) {
    authService.getUser().subscribe((user) => {
      this.user = user;
    });
    this.dynamoDBService.getMetaData().subscribe((metadata) => {
      console.log(metadata);
      this.MDs = metadata;
    });
  }

  ngOnInit(): void {
    this.authService.login();
  }

  public checkIfFavorite(metadata: IMetadata): boolean {
    return this.user.Favorites?.includes(metadata.uId) || false;
  }
}
