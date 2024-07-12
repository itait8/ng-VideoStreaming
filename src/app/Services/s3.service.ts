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

  public async uploadVideo(file: any) {
    const command = new PutObjectCommand({
      Bucket: S3_CONFIG.BUCKETS.videos,
      Key: file.name,
      Body: file,
      ContentType: file.type,
    });
    console.log(command);
    const response = await this.s3Client.send(command);
    console.log(response);
    return response;
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
