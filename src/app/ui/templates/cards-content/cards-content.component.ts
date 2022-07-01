import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TrackData } from "custom/models/models";

@Component({
  selector: 'app-cards-content',
  templateUrl: './cards-content.component.html',
  styleUrls: ['./cards-content.component.sass']
})
export class CardsContentComponent implements OnInit {

  cardList : TrackData[] = [];
  icon : string = '';

  @Input() set cards(data: TrackData[]) {
    this.cardList = data;
  }

  @Input() set iconcards(data: string) {
    this.icon = data;
  }

  @Output() clickIconEvent = new EventEmitter<TrackData>();

  constructor() { }

  ngOnInit(): void {
  }

  public clickIcon(event: TrackData): void{
    this.clickIconEvent.emit(event);
  }

}
