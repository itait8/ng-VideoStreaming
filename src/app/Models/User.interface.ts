export interface IUser {
  DisplayName: string;
  email: string;
  PhotoURL: string;
  uId: string;
  UploadedVideos?: Array<string>;
  Favorites?: Array<string | null>;
}
