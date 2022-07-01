import { Component, OnInit } from '@angular/core';
import { CommonService } from 'custom/services/common.service';
import { TrackData } from "custom/models/models";
import { last } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  public listTracks: TrackData[] = [];
  public listTracksCopy: TrackData[] = [];
  private arrayGroups: any[] = [];
  private counter: number = 0;
  public loading: boolean = false;

  constructor(
    private _common: CommonService
  ) { }

  ngOnInit(): void {
    this.getHomePlayList();
  }

  public getHomePlayList(): void {
    try {
      this.loading = true;
      this._common.getHomePlayList().subscribe(res => {
        console.log("Playlist: ", res);
        this.handleHomePlayListResult(res.tracks.items)
      })
    } catch (error) {
      console.error(error)
    }
  }

  private handleHomePlayListResult(list: any): void {
    this.listTracksCopy = this._common.formatTrack(list);
    this.separateGroups(this.listTracksCopy);
  }

  private separateGroups(list: TrackData[]): void {
    let numGroups = Math.ceil(list.length / 50);
    let totalElements = list.length;
    this.arrayGroups = [];
    let count: number = 0;
    let lastPosition: number = 0;

    for (let i = 0; i < numGroups; i++) {
      count = totalElements < 50 ? list.length : count + 50;
      this.arrayGroups.push(list.slice(lastPosition, count));
      lastPosition = count;
      totalElements -= count
    }
    console.log(this.arrayGroups)
    this.startVerifyFavorites(this.arrayGroups);
  }

  private startVerifyFavorites(list: any[]): void {
    if (this.counter < list.length) {
      this.consultIfFavorite(list[this.counter]);
    } else {
      this.loading = false;
    }
  }

  private consultIfFavorite(array: any) {
    const param = array.map((elem: TrackData) => {
      return elem.id;
    }).join(",");

    try {
      this._common.checkFavoritesGroup(param).subscribe(res => {
        console.log(res)
        array.forEach((element: TrackData, index: number) => {
          element.favorite = res[index];
          this.listTracks.push(element);
        });
        this.counter += 1;
        this.startVerifyFavorites(this.arrayGroups);
      })
    } catch (error) {

    }
  }

  public clickIcon(track: TrackData) {
    if (!track.favorite) {
      this.setFavorite(track);
    } else {
      this.deteleFavorite(track);
    }
  }

  private setFavorite(track: TrackData): void {
    try {
      this.loading = true;
      this._common.putFavorite(track.id).subscribe(res => {
        track.favorite = true
        console.log(res);
        this.loading = false;
      })
    } catch (error) {
      console.error(error);
    }
  }

  private deteleFavorite(track: TrackData): void {
    try {
      this.loading = true;
      track.favorite = false;
      this._common.deleteFavorite(track.id).subscribe(res => {
        console.log(res)
        this.loading = false;
      })
    } catch (error) {
      console.error(error);
    }
  }



}
