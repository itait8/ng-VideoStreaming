import { Component, ViewChild } from '@angular/core';
import { MaterialModule } from '../../Material/Material.module';
import { NgForm, FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../Services/auth.service';
import { IMetadata } from '../../Models/Metadata..interface';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [MaterialModule, FormsModule],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss',
})
export class UploadComponent {
  constructor(public dialog: MatDialog, private authService: AuthService) {}

  @ViewChild('f') form?: NgForm;

  selectedFile: any = null;

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] ?? null;
    console.log(this.selectedFile);
    this.selectedFile.getContext();
  }

  public uploadVideo() {
    if (this.form?.valid && this.selectedFile?.size < 100000000) {
      const formValues = this.form.form.value;
      const videoToUpload: IMetadata = {
        uId: uuidv4(),
        uploadTime: new Date(),
        name: formValues.name,
        uploadedBy: this.authService.getUserId(),
        description: formValues.description,
        comments: '',
      };
      this.authService.uploadVideo(videoToUpload, this.selectedFile);
      this.dialog.closeAll();
    }
  }
}
