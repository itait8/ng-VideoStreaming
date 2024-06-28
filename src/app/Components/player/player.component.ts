import { Component, Input } from '@angular/core';
import { IMetadata } from '../../Models/Metadata..interface';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DynamoDBService } from '../../Services/dynamo-dbservice.service';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss'
})
export class PlayerComponent {
 public video:IMetadata | undefined;
  constructor(private dynamoDBService: DynamoDBService,private router:Router){
   this.video = dynamoDBService.getMetadataById(router.url.split('/')[2]);
    
  }


}
