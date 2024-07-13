import { Injectable } from '@angular/core';

import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
  S3ClientConfig,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import {
  DYNAMO_DB_SERVICE_ACCOUNT,
  S3_CONFIG,
} from '../../enviroment/emviroment';

import { v4 as uuid4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class S3Service {
  private s3Client = new S3Client({
    region: S3_CONFIG.REGION,
    credentials: {
      accessKeyId: S3_CONFIG.AWS_ACCESS_KEY,
      secretAccessKey: S3_CONFIG.AWS_SECRET_ACCESS_KEY,
    },
  });

  constructor() {}

  public uploadVideo(file: any, uId: string) {
    const command = new PutObjectCommand({
      Bucket: S3_CONFIG.BUCKETS.videos,
      Key: uId,
      Body: file,
      ContentType: file.type,
    });
    this.s3Client.send(command);
  }

  public async getVideo(fileName: string) {
    let expirationMinutes = 60;

    const command = new GetObjectCommand({
      Bucket: 'animusvision-videos-storage',
      Key: fileName,
    });

    const url = await getSignedUrl(this.s3Client, command, {
      expiresIn: expirationMinutes * 60,
    });

    return url;
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

    /* const command = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      ContentType: contentType,
    }); */

    const command = new GetObjectCommand({
      Bucket: 'animusvision-videos-storage',
      Key: 'תיעודים מבצעיים של שיגור מיירטי כיפת ברזל ויירוטים שבוצעו בדרום הארץ בימים האחרונים.mp4',
    });

    const url = await getSignedUrl(this.s3Client, command, {
      expiresIn: expirationMinutes,
    });

    return url;
  }
}
