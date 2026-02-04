import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="search-container">
      <h2>Recherche</h2>
      <p>Recherchez des profils et des posts</p>
    </div>
  `,
  styles: [`
    .search-container {
      padding: 1rem;
    }
    h2 {
      color: #0a66c2;
    }
  `]
})
export class SearchComponent {}
