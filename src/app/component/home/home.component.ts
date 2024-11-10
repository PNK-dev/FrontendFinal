import { Component } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MenubarModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        routerLink: '/home',
        label: 'Home',
        icon: 'pi pi-home',
      },
      {
        routerLink: '/notas',
        label: 'Notas',
        icon: 'pi pi-star',
      },
      
    ];
  }
}
