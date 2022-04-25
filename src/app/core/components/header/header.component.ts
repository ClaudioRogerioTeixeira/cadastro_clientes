import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  title = "Cadastro de Clientes"

  constructor(private router: Router) { }

  navigateTo(route: string): void {
    this.router.navigate([`/${route}`]);
  }

}
