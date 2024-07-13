import { Component, Input, OnInit } from '@angular/core';
import { IMetadata } from '../../Models/Metadata..interface';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../Material/Material.module';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { IUser, emptyUser } from '../../Models/User.interface';
import { S3Service } from '../../Services/s3.service';

@Component({
  selector: 'app-preview',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.scss',
})
export class PreviewComponent implements OnInit {
  private user: IUser = emptyUser;
  public metadata: IMetadata | undefined;
  public uploadString: string = '';
  public signedURL = '';

  public bookmarkIconType: string = '';

  @Input()
  isFavoriteVideo!: boolean;

  @Input() set preview(preview: IMetadata) {
    if (preview) {
      this.metadata = preview;
      this.uploadString = this.diffTime(new Date(), this.metadata.uploadTime);

      this.s3Service
        .getVideo(this.metadata.uId)
        .then((res) => (this.signedURL = res));
    }
  }

  constructor(
    private router: Router,
    private authService: AuthService,
    private s3Service: S3Service
  ) {
    this.authService.getUser().subscribe((user) => (this.user = user));
  }

  public diffTime(x: Date, y: Date): string {
    console.log(this.metadata);
    const diff: number = x.getTime() - y.getTime();
    const years = diff / (1000 * 60 * 60 * 24 * 365);
    if (years > 1) {
      return Math.floor(years) + ' years ago';
    }
    const months = diff / (1000 * 60 * 60 * 24 * 30);
    if (months > 1) {
      return Math.floor(months) + ' months ago';
    }
    const days = diff / (1000 * 60 * 60 * 24);
    if (days > 1) {
      return Math.floor(days) + ' days ago';
    }

    return 'today';
  }

  public bookmarkClick() {
    this.isFavoriteVideo = !this.isFavoriteVideo;
    if (this.isFavoriteVideo) this.addToFavorites();
    else this.removeFromFavorites();
  }

  public addToFavorites() {
    if (this.metadata) this.authService.addFavorite(this.metadata?.uId);
  }
  public removeFromFavorites() {
    if (this.metadata) this.authService.removeFavorite(this.metadata?.uId);
  }

  ngOnInit(): void {}

  public goToVideo(): void {
    if (this.metadata) {
      console.log('routing to video ...');
      this.router.navigateByUrl('Video/' + this.metadata.uId);
    }
  }
}
