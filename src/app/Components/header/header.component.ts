import { Component, inject, OnDestroy } from '@angular/core';
import { MaterialModule } from '../../Material/Material.module';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { Subscription } from 'rxjs';
import { UploadComponent } from '../upload/upload.component';
import { MatDialog } from '@angular/material/dialog';
import { DynamoDBService } from '../../Services/dynamo-dbservice.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MaterialModule, CommonModule, RouterModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnDestroy {
  public searchValue = '';
  public isLoggedIn: boolean = false;
  private subscription: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private router: Router,
    private dynamoDBService: DynamoDBService
  ) {
    this.subscription.add(
      this.authService.isLoggedIn().subscribe((data) => {
        this.isLoggedIn = data;
      })
    );
  }
  public search(): void {
    this.router.navigate(['/Home']);
    this.dynamoDBService.search(this.searchValue);
    /*
    add search logic
    need to add routing to home component and THEN initiate search
    */
  }

  public clearSearch() {
    this.dynamoDBService.clearSearch();
  }

  public redirectToLogin(): void {
    this.authService.loginPage();
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public logOut(): void {
    this.authService.logOut();
  }

  readonly dialog = inject(MatDialog);

  public openDialog(): void {
    this.dialog.open(UploadComponent, {
      width: '450px',
      height: '600px',
    });
  }
}
