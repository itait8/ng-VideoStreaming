import { Component } from '@angular/core';
import { MaterialModule } from '../../Material/Material.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MaterialModule, CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  public query: string = '';

  public search(event: KeyboardEvent) {
    if (event.key == 'Backspace') {
      if (this.query.length) this.query = this.query.slice(0, -1);
    } else if (event.key.length == 1) {
      this.query += event.key;
    }
    console.log(this.query);
    // Implement your search logic here
  }

  public clearSearch() {
    this.query = '';
  }
}
