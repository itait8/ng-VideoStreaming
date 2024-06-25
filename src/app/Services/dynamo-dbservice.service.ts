import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk';
import { AwsConfigService } from './aws-config.service';


@Injectable({
  providedIn: 'root'
})
export class DynamoDBService {
  private dynamoDb: AWS.DynamoDB;

  constructor(private AwsConfigService: AwsConfigService) {
    AWS.config.update({
      region: AwsConfigService.getAwsConfig().region,
      accessKeyId: AwsConfigService.getAwsConfig().accessKeyId,
      secretAccessKey: AwsConfigService.getAwsConfig().secretAccessKey
    });
    this.dynamoDb = new AWS.DynamoDB();
  }

  public async getItem(tableName: string, key: any): Promise<any> {
    const params = {
      TableName: tableName,
      Key: key
    };
    return this.dynamoDb.getItem(params).promise();
  }

  public async putItem(tableName: string, item: any): Promise<any> {
    const params = {
      TableName: tableName,
      Item: item
    };
    return this.dynamoDb.putItem(params).promise();
  }

  // Add more CRUD methods as needed
}
