import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AwsConfigService {

  constructor() { }

 private AWSConfig = {
    region: 'eu-north-1',
    accessKeyId: 'AKIAYS2NW4EHNJ3FUHUI',
    secretAccessKey: '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'
  };

  public getAwsConfig() {
    return this.AWSConfig;
  }
  
}
