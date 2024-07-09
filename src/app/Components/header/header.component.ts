import { Component } from '@angular/core';
import { MaterialModule } from '../../Material/Material.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MaterialModule, CommonModule, RouterModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  value = '';

  constructor(private authService: AuthService) {}
  public search(): void {
    /*
    add search logic
    need to add routing to home component and THEN initiate search
    */
  }

  public redirectToLogin(): void {
    this.authService.loginPage();
  }
}
