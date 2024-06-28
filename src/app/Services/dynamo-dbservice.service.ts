import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IMetadata } from '../Models/Metadata..interface';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import * as data from '../../assets/mock_data/metadata/MOCK_DATA.json';

@Injectable({
  providedIn: 'root',
})
export class DynamoDBService {
  private MockMD$: BehaviorSubject<Array<IMetadata>>;
  private mockMD: Array<IMetadata>;
  private currentVideo: BehaviorSubject<IMetadata> | undefined

  constructor() {
    this.mockMD = (data as any).default;
    this.MockMD$ = new BehaviorSubject<Array<IMetadata>>((data as any).default);
  }

  public getMetaData(): Observable<Array<IMetadata>> {
    return this.MockMD$.asObservable();
  }
  public getMetadataById(uId:string):IMetadata | undefined{
    return this.mockMD.find((video)=>video.uId===uId);
  }
  
}
