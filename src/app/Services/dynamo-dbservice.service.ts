import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IMetadata } from '../Models/Metadata..interface';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import * as data from '../../assets/mock_data/metadata/MOCK_DATA.json';
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
  private currentVideo: BehaviorSubject<IMetadata> | undefined;

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
        ThumbnailURL: { S: md.ThumbnailURL },
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
  }
  public getMetadataById(uId: string): IMetadata | undefined {
    return this.MDs.find((video) => video.uId === uId);
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
            ThumbnailURL: item['ThumbnailURL'].S || '',
            comments: item['comments']?.S || '',
          });
        });
      })
      .catch((err) => console.log(err));
  }
}
