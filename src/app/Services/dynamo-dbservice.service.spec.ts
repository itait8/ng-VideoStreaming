import { TestBed } from '@angular/core/testing';

import { DynamoDBServiceService } from './dynamo-dbservice.service';

describe('DynamoDBServiceService', () => {
  let service: DynamoDBServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DynamoDBServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
