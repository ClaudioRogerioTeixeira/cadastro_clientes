import { LoadingService } from './../../services/loading.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  constructor(public loadingService: LoadingService) { }

  ngOnInit(): void {
    console.log();
  }

}
