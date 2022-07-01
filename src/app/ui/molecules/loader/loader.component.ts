import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.sass']
})
export class LoaderComponent implements OnInit {

  show : boolean = false;

  @Input() set loading(show: boolean) {
    this.show = show;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
