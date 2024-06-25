export interface IUser {
  DisplayName: string;
  Email: string;
  PhotoURL: string;
  Uid: string;
  UploadedVideos: Array<string | null>;
  Favorites: Array<string | null>;
}
