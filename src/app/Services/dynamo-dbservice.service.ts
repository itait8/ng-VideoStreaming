import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IMetadata } from '../Models/Metadata..interface';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DynamoDBService {
  private MockMD$: Subject<Array<IMetadata> | undefined>;
  private mockMD: Array<IMetadata> | undefined;

  constructor(private http: HttpClient) {
    this.http
      .get('public/mock data/Videos/MOCK_DATA.json')
      .subscribe((data) => {
        this.mockMD = <Array<IMetadata>>data;
      });
    this.MockMD$ = new Subject();
    this.MockMD$.next(this.mockMD);
    console.log('flag 2');
  }

  public getMetaData(): Observable<Array<IMetadata> | undefined> {
    return this.MockMD$.asObservable();
  }
}
