import { Component, OnDestroy } from '@angular/core';
import { MaterialModule } from '../../Material/Material.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MaterialModule, CommonModule, RouterModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnDestroy {
  value = '';
  public isLoggedIn: boolean = false;
  private subscription: Subscription = new Subscription();

  constructor(private authService: AuthService) {
    this.subscription.add(
      this.authService.isLoggedIn().subscribe((data) => {
        this.isLoggedIn = data;
      })
    );
  }
  public search(): void {
    /*
    add search logic
    need to add routing to home component and THEN initiate search
    */
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
}
