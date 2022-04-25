import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  template: `
    <mat-card>
      <mat-card-title>404: Page Not Found</mat-card-title>
      <mat-card-content>
        Verifique a url digitada. Endereço não encontrado.
      </mat-card-content>
      <mat-card-actions>
        <button mat-raised-button color="primary" routerLink="/">
          Início
        </button>
      </mat-card-actions>
    </mat-card>
  `,
  styles: [`
    /*
    :host {
      text-align: center;
    }
    */
    mat-card-title {
      color: red !important;
    }


  `]

})
export class PageNotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log();
  }

}
