export interface IUser {
  DisplayName: string;
  Email: string;
  PhotoURL: string;
  uId: string;
  UploadedVideos: Array<string | null>;
  Favorites: Array<string | null>;
}
