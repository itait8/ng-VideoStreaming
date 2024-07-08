import { Injectable } from '@angular/core';
import { AwsService } from './aws.service';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { IMetadata } from '../Models/Metadata..interface';
import { Behavior } from 'aws-sdk/clients/guardduty';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  private MDs: Array<IMetadata> | undefined;

  private MDs$: BehaviorSubject<Array<IMetadata>> | undefined;
  constructor(private awsService: AwsService) {
    awsService.getMetadata().subscribe((data) => {
      this.MDs = data;
      this.MDs$ = new BehaviorSubject(data);
    });
  }

  public generateURL() {
    return this.awsService.generateUrl();
  }

  public getMetadata(): Observable<Array<IMetadata>> | undefined {
    return this.MDs$?.asObservable();
  }

  public getMetadataById(uId: string): IMetadata | undefined {
    return this.MDs?.find((video) => video.uId === uId);
  }
}
