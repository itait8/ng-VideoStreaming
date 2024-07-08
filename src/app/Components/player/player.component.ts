import { Component, Input } from '@angular/core';
import { IMetadata } from '../../Models/Metadata..interface';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DynamoDBService } from '../../Services/dynamo-dbservice.service';
import { VideoService } from '../../Services/video.service';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss',
})
export class PlayerComponent {
  public video: IMetadata | undefined;
  constructor(private videoService: VideoService, private router: Router) {
    videoService.generateURL().then((res) => {
      if (this.video?.videoURL) this.video.videoURL = res as string;
    });
    this.video = videoService.getMetadataById(router.url.split('/')[2]);
  }
}
