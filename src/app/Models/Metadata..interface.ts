import { IComment } from './Comment.interface';

export interface IMetadata {
  Uid: string;
  UploadTime: Date;
  VideoName: string;
  UploadedBy: string;
  Description: string;
  Comments: Array<IComment>;
  VideoURL: string;
  VideoThumbnailURL: string;
}
