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

  private MockMD$: BehaviorSubject<Array<IMetadata>>;
  private mockMD: Array<IMetadata>;
  private currentVideo: BehaviorSubject<IMetadata> | undefined;

  constructor() {
    this.mockMD = (data as any).default;
    this.MockMD$ = new BehaviorSubject<Array<IMetadata>>((data as any).default);

    const putItemParams: PutItemCommandInput = {
      TableName: DYNAMO_DB_SERVICE_ACCOUNT.TABLES.metadata,
      Item: {
        uId: { S: '123' },
        name: { S: 'Test' },
      },
    };
    const putItemCommand = new PutItemCommand(putItemParams);
    this.client.send(putItemCommand);
    console.log('item sent to db');

    const getItemParams = {
      TableName: DYNAMO_DB_SERVICE_ACCOUNT.TABLES.metadata,
      Key: {
        uId: { S: '123' },
      },
    };

    const getItemCommand = new GetItemCommand(getItemParams);
    const response = this.client.send(getItemCommand);
    console.log(response);
  }

  public getMetaData(): Observable<Array<IMetadata>> {
    return this.MockMD$.asObservable();
  }
  public getMetadataById(uId: string): IMetadata | undefined {
    return this.mockMD.find((video) => video.uId === uId);
  }
}
