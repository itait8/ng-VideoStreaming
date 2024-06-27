import { IComment } from './Comment.interface';

export interface IMetadata {
  uId: string;
  uploadTime: Date | string;
  name: string;
  uploadedBy: string;
  description: string;
  comments: Array<IComment> | string;
  videoURL: string;
  ThumbnailURL: string;
}
