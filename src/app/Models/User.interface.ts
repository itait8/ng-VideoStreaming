export interface IUser {
  DisplayName: string;
  Email: string;
  PhotoURL: string;
  uId: string;
  UploadedVideos?: Array<string>;
  Favorites?: Array<string | null>;
}
