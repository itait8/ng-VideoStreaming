import { Component, Input } from '@angular/core';
import { IMetadata } from '../../Models/Metadata..interface';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DynamoDBService } from '../../Services/dynamo-dbservice.service';
import { VideoService } from '../../Services/video.service';
import { S3Service } from '../../Services/s3.service';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss',
})
export class PlayerComponent {
  public video: IMetadata | undefined;
  public signedURL = '';
  constructor(
    private dynamoDBService: DynamoDBService,
    private router: Router,
    private s3Service: S3Service
  ) {
    console.log(router.url.split('/')[2]);
    this.video = dynamoDBService.getMetadataById(router.url.split('/')[2]);

    s3Service.getVideo(router.url.split('/')[2]).then((res) => {
      this.signedURL = res as string;
    });
  }
}
