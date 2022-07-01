import { Component, OnInit } from '@angular/core';
import { TrackData } from 'custom/models/models';
import { CommonService } from 'custom/services/common.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.sass']
})
export class FavoritesComponent implements OnInit {

  public listTracks: TrackData[] = [];
  public loading : boolean = false;

  constructor(
    private _common : CommonService
  ) { }

  ngOnInit(): void {
    this.getFavorites();
  }

  public getFavorites(): void{
    try {
      this.loading = true;
      this._common.getFavorites().subscribe(res =>{
        console.log("Favorites: ",res);
        this.handleFavoritePlayListResult(res.items);
        this.loading = false;
      })
    } catch (error) {
      console.error(error)
    }
  }

  private handleFavoritePlayListResult(list: any): void{
    this.listTracks = this._common.formatTrack(list);
  }

  public deteleFavorite(track : TrackData): void{
    try {
      this.loading = true;
      this._common.deleteFavorite(track.id).subscribe(res=>{
        let elementDelete = this.listTracks.findIndex(data=>data.id == track.id);
        if(elementDelete !== -1){
          this.listTracks.splice(elementDelete, 1);
        }
        this.loading = false;
      })
    } catch (error) {
      console.error(error);
    }
  }

}