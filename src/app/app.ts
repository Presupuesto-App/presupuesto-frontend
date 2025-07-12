import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: true,
  imports: [RouterModule, NavbarComponent],
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('presupuesto-inteligente-frontend');
}
