import { Injectable } from '@angular/core';
import { AwsService } from './aws.service';
import { Observable } from 'rxjs';
import { IMetadata } from '../Models/Metadata..interface';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  private MDs = Array<IMetadata>;

  constructor(private awsService:AwsService) {
    this.awsService.getMetadata().subscribe(data => this.MDs = data);
   }
}
