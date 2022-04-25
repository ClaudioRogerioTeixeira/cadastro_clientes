import { IDialog } from './../../interfaces/dialog.interface';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {
  // element = document.querySelectorAll('p');

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IDialog ) { }

    ngOnInit(): void {
      console.log();
      // console.log('elements: ', this.element.length);
    }

}
