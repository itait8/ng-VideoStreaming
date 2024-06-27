import { Component, Input } from '@angular/core';
import { IMetadata } from '../../Models/Metadata..interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.scss',
})
export class PreviewComponent {
  public metadata: IMetadata | undefined;
  public uploadedString: string = '';

  @Input() set preview(preview: IMetadata) {
    this.metadata = preview;
    //this.uploadedString = this.metadata.uploadedBy
    console.log(this.metadata.uploadTime);
    const temp: string[] = this.metadata.uploadTime.toString().split('/');
    if (temp[0].length == 1) {
      temp[0] = '0'.concat(temp[0]);
    }
    if (temp[1].length == 1) {
      temp[1] = '0'.concat(temp[1]);
    }

    this.uploadedString = temp.join('-');
    console.log(this.uploadedString);
  }
}
