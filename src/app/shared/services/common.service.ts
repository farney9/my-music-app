import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { TrackData } from 'custom/models/models';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  urlPrincipalPlayList = `${environment.urlPlaylist}/playlists/5s2nvxeIYRBGA7AsC9Ypxw`;
  urlFavorites = `${environment.urlPlaylist}/me/tracks`;
  urlProfile = `${environment.urlPlaylist}/me`;

  constructor(
    private http: HttpClient
  ) { }

  getHomePlayList(): Observable<any> {
    return this.http.get<any>(this.urlPrincipalPlayList);
  }

  getFavorites(): Observable<any> {
    return this.http.get<any>(this.urlFavorites);
  }

  putFavorite(id : string): Observable<any> {
    return this.http.put<any>( `${this.urlFavorites}?ids=${id}`, "");
  }

  deleteFavorite(id : string): Observable<any> {
    return this.http.delete<any>( `${this.urlFavorites}?ids=${id}`);
  }

  checkFavoritesGroup(ids: string) : Observable<any> {
    return this.http.get<any>(`${this.urlFavorites}/contains?ids=${ids}`);
  }

  getDataProfile() : Observable<any> {
    return this.http.get<any>(this.urlProfile);
  }

  formatTrack(list: any) :TrackData[] {
    let arrayReturn: TrackData[] = [];
    list.forEach((elem: any) => {
      let objectTracksToUse: TrackData = {
        id: elem.track.id,
        nameTrack: elem.track.name,
        duration: elem.track.duration_ms,
        url: elem.track.external_urls.spotify,
        img: elem.track.album.images[0].url,
        release_date: elem.track.album.release_date,
        album: elem.track.album.name,
        artist: elem.track.album.artists[0].name,
        favorite: false
      }

      arrayReturn.push(objectTracksToUse);
    });
    return arrayReturn;
  }
}
