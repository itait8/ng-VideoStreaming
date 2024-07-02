import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IMetadata } from '../Models/Metadata..interface';
import * as data from '../../assets/mock_data/metadata/MOCK_DATA.json';
import {
  GetObjectAclCommand,
  PutObjectCommand,
  S3Client,
  S3ClientConfig,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { DYNAMO_DB_SERVICE_ACCOUNT } from '../../enviroment/emviroment';

@Injectable({
  providedIn: 'root',
})
export class AwsService {
  private MockMD$: BehaviorSubject<Array<IMetadata>>;
  private mockMD: Array<IMetadata>;
  private currentVideo: BehaviorSubject<IMetadata> | undefined;

  constructor() {
    this.mockMD = (data as any).default;
    this.MockMD$ = new BehaviorSubject(this.mockMD);
  }

  public getMetadata(): Observable<Array<IMetadata>> {
    return this.MockMD$.asObservable();
  }

  public getMetadataById(uId: string): IMetadata | undefined {
    return this.mockMD.find((video) => video.uId === uId);
  }

  public async generateUrl /* directory: string,
    filename: string,
    defaultFileName: string, */() {
    /* let key = directory + '/' + filename;
    if (filename == undefined) {
      key = directory + '/' + defaultFileName;
    } */

    let expirationMinutes = 60;
    if (process.env['ExpirationMinutes'] != undefined) {
      expirationMinutes = parseInt(process.env['ExpirationMinutes']);
    }

    const S3ClientConfig: S3ClientConfig = {
      region: DYNAMO_DB_SERVICE_ACCOUNT.REGION,
      credentials: {
        accessKeyId: DYNAMO_DB_SERVICE_ACCOUNT.AWS_ACCESS_KEY,
        secretAccessKey: DYNAMO_DB_SERVICE_ACCOUNT.AWS_SECRET_ACCESS_KEY,
      },
    };

    const s3 = new S3Client(S3ClientConfig);
    /* const command = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      ContentType: contentType,
    }); */

    const command = new GetObjectAclCommand({
      Bucket: 'animusvision-videos-storage',
      Key: 'תיעודים מבצעיים של שיגור מיירטי כיפת ברזל ויירוטים שבוצעו בדרום הארץ בימים האחרונים.mp4',
    });

    /* const url = await getSignedUrl(s3, command, {
      expiresIn: expirationMinutes,
    });

    console.log(url); */
  }
}
