import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IMetadata } from '../Models/Metadata..interface';
import * as data from '../../assets/mock_data/metadata/MOCK_DATA.json';

@Injectable({
  providedIn: 'root'
})
export class AwsService {
  private MockMD$: BehaviorSubject<Array<IMetadata>>;
  private mockMD: Array<IMetadata>;
  private currentVideo: BehaviorSubject<IMetadata> | undefined;
  
  constructor() { 
    this.mockMD = (data as any).default;
    this.MockMD$ = new BehaviorSubject<Array<IMetadata>>((data as any).default);
  }

  public getMetadata():Observable<Array<IMetadata>>{
    return this.MockMD$.asObservable();
  }
  
  public getMetadataById(uId:string):IMetadata | undefined{
    return this.mockMD.find((video)=>video.uId===uId);
  }
  
}
