import { Component } from '@angular/core';
import { MaterialModule } from '../../Material/Material.module';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../Services/auth.service';
import { IMetadata } from '../../Models/Metadata..interface';
import { DynamoDBService } from '../../Services/dynamo-dbservice.service';
import { emptyUser, IUser } from '../../Models/User.interface';
import { PreviewComponent } from '../preview/preview.component';

@Component({
  selector: 'app-uploaded',
  standalone: true,
  imports: [MaterialModule, CommonModule, PreviewComponent],
  templateUrl: './uploaded.component.html',
  styleUrl: './uploaded.component.scss',
})
export class UploadedComponent {
  public favoritesId: Array<string> = [];
  public uploaded: Array<IMetadata> = [];
  public user: IUser = emptyUser;
  constructor(
    private authService: AuthService,
    private dynamoDBService: DynamoDBService
  ) {}

  ngOnInit(): void {
    this.uploaded = this.authService.getUploaded();
    console.log(this.uploaded);
  }

  ngOnDestroy() {
    this.favoritesId = [];
    this.uploaded = [];
  }
}
