import { IComment } from './Comment.interface';

export interface IMetadata {
  uId: string;
  uploadTime: Date;
  name: string;
  uploadedBy: string;
  description: string;
  comments: Array<IComment> | string;
  ThumbnailURL: string;
}
