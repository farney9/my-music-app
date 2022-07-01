import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TrackData } from "custom/models/models";
@Component({
  selector: 'app-track-card',
  templateUrl: './track-card.component.html',
  styleUrls: ['./track-card.component.sass']
})
export class TrackCardComponent implements OnInit {

  cardData : TrackData = {
    id: '',
    nameTrack: '',
    duration: 0,
    url: '',
    img: '',
    release_date: '',
    album: '',
    artist: '',
    favorite: false
  }

  icon : string = ""

  @Input() set card(data: TrackData) {
    this.cardData = data;
  }

  @Input() set geticon(data: string) {
    this.icon = data;
  }

  @Output() clickIconEvent = new EventEmitter<TrackData>();

  constructor() { }

  ngOnInit(): void {
  }

  public clickIcon(): void{
    this.clickIconEvent.emit(this.cardData);
  }

}
