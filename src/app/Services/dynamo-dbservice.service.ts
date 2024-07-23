import { Injectable } from '@angular/core';
import { IMetadata } from '../Models/Metadata..interface';
import { BehaviorSubject, Observable } from 'rxjs';

import {
  DynamoDBClient,
  PutItemCommand,
  PutItemCommandInput,
  GetItemCommand,
  ScanCommand,
} from '@aws-sdk/client-dynamodb';
import { DYNAMO_DB_SERVICE_ACCOUNT } from '../../enviroment/emviroment';

@Injectable({
  providedIn: 'root',
})
export class DynamoDBService {
  private client = new DynamoDBClient({
    region: DYNAMO_DB_SERVICE_ACCOUNT.REGION,
    credentials: {
      accessKeyId: DYNAMO_DB_SERVICE_ACCOUNT.AWS_ACCESS_KEY,
      secretAccessKey: DYNAMO_DB_SERVICE_ACCOUNT.AWS_SECRET_ACCESS_KEY,
    },
  });

  private MDs: Array<IMetadata> = [];
  private MDs$ = new BehaviorSubject(this.MDs);
  private VideosToDisplay: Array<IMetadata> = [];
  private VideosToDisplay$ = new BehaviorSubject(this.VideosToDisplay);

  constructor() {
    this.downloadMds();
  }

  private uploadMD(md: IMetadata) {
    const putItemParams: PutItemCommandInput = {
      TableName: DYNAMO_DB_SERVICE_ACCOUNT.TABLES.metadata,
      Item: {
        uId: { S: md.uId },
        name: { S: md.name },
        uploadTime: { S: md.uploadTime.getTime().toString() },
        uploadedBy: { S: md.uploadedBy },
        description: { S: md.description },
      },
    };
    const putItemCommand = new PutItemCommand(putItemParams);
    this.client.send(putItemCommand).then(() => this.MDs.push(md));
  }

  public insertMD(metadata: IMetadata) {
    this.uploadMD(metadata);
  }

  public getMetaData(): Observable<Array<IMetadata>> {
    return this.MDs$.asObservable();
    //return this.VideosToDisplay$.asObservable();
  }
  public getMetadataById(uId: string): IMetadata | undefined {
    console.log(uId);
    console.log(this.MDs.find((video) => video.uId == uId));
    return this.MDs.find((video) => video.uId === uId);
  }

  public getMetadatasById(uIds: string[]): IMetadata[] {
    const favorites: IMetadata[] = [];
    uIds.forEach((uId) =>
      favorites.push(this.MDs.find((video) => video.uId === uId)!)
    );
    console.log('favorites: ', favorites);
    return favorites;
  }

  public downloadMds() {
    const scanCommand = new ScanCommand({
      TableName: DYNAMO_DB_SERVICE_ACCOUNT.TABLES.metadata,
    });

    this.client
      .send(scanCommand)
      .then((res) => {
        res.Items?.forEach((item) => {
          console.log(item);
          this.MDs.push({
            uId: item['uId'].S || '',
            name: item['name'].S || '',
            uploadTime: new Date(Number(item['uploadTime'].S) || '2000-01-01'),
            uploadedBy: item['uploadedBy'].S || '',
            description: item['description'].S || '',
            comments: item['comments']?.S || '',
          });
        });
      })
      .catch((err) => console.log(err));
  }

  private getVideosNames(): string[] {
    var names: string[] = [];
    this.MDs.forEach((md) => names.push(md.name));
    return names;
  }

  public clearSearch() {
    this.MDs$.next(this.MDs);
  }

  public search(searchWord: string): void {
    this.VideosToDisplay = [];
    const videosNames = this.Search(searchWord, this.getVideosNames());
    this.MDs.forEach((video) => {
      if (videosNames.includes(video.name)) this.VideosToDisplay.push(video);
    });
    console.log(this.VideosToDisplay);
    this.MDs$.next(this.VideosToDisplay);
  }

  public Search(searchWord: string, list: string[]): string[] {
    var dict: any = {};
    list.forEach((item) => {
      dict[item] = this.wagnerFischer(searchWord, item) / item.length;
    });

    var result: string[] = [];
    var unpacked = Object.entries(dict);

    unpacked.sort((a: [string, any], b: [string, any]) => a[1] - b[1]);

    unpacked.slice(0, 4).forEach((item) => result.push(item[0]));
    return result;
  }

  private wagnerFischer(str1: string, str2: string): number {
    const len1 = str1.length;
    const len2 = str2.length;

    // Create a 2D array to store the edit distances
    const dp: Array<Array<number>> = Array.from({ length: len1 + 1 }, () =>
      Array(len2 + 1).fill(0)
    );

    // Initialize the first row and column
    for (let i = 0; i <= len1; i++) {
      dp[i][0] = i;
    }
    for (let j = 0; j <= len2; j++) {
      dp[0][j] = j;
    }

    // Fill in the rest of the dp array
    for (let i = 1; i <= len1; i++) {
      for (let j = 1; j <= len2; j++) {
        if (str1[i - 1] === str2[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1];
        } else {
          dp[i][j] = Math.min(
            dp[i - 1][j] + 1, // Deletion
            dp[i][j - 1] + 1, // Insertion
            dp[i - 1][j - 1] + 1 // Substitution
          );
        }
      }
    }
    // The edit distance is the value in the bottom-right corner of the dp array
    return dp[len1][len2];
  }
}
