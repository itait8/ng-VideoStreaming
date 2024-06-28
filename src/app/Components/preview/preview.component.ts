import { Component, Input, OnInit } from '@angular/core';
import { IMetadata } from '../../Models/Metadata..interface';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../Material/Material.module';

@Component({
  selector: 'app-preview',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.scss',
})
export class PreviewComponent implements OnInit {
  public metadata: IMetadata | undefined;
  public uploadString: string = '';

  public bookmarkIconType: string = '';

  @Input() isFavoriteVideo: boolean = false;

  @Input() set preview(preview: IMetadata) {
    if (preview) {
      this.metadata = preview;
      this.uploadString = this.diffTime(
        new Date(),
        this.formatStringToDate(this.metadata.uploadTime.toString())
      );
    }
  }

  private formatStringToDate(uploadTime: string): Date {
    const parsedDate: string[] = uploadTime.split('/');
    var formattedString: string = '';
    if (parsedDate[0].length == 1) {
      parsedDate[0] = '0'.concat(parsedDate[0]);
    }
    if (parsedDate[1].length == 1) {
      parsedDate[1] = '0'.concat(parsedDate[1]);
    }

    formattedString = parsedDate.reverse().join('-');
    return new Date(Date.parse(formattedString));
  }

  public diffTime(x: Date, y: Date): string {
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
    if (this.isFavoriteVideo) {
      this.bookmarkIconType = 'bookmark';
      this.addToFavorites();
    } else {
      this.bookmarkIconType = 'bookmark_border';
      this.removeFromFavorites();
    }
  }

  public addToFavorites() {}
  public removeFromFavorites() {}

  ngOnInit(): void {
    if (this.isFavoriteVideo) {
      this.bookmarkIconType = 'bookmark';
    } else this.bookmarkIconType = 'bookmark_border';
  }
}
