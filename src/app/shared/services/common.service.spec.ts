import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { CommonService } from './common.service';
import { listTrackMock, trackMock } from "custom/models/mocks";

describe('CommonService', () => {
  let service: CommonService;
  let httpMock: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CommonService],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ]
    });
    service = TestBed.inject(CommonService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterAll(()=>{
    httpMock.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getHomePlayList should get a object and it have to be a get method', ()=>{
    service.getHomePlayList().subscribe(res=>{
      expect(res).toEqual(listTrackMock);
    })

    const req = httpMock.expectOne(environment.urlPlaylist + "/playlists/3lJwVZWRmKWLcrXvEkH31v");
    expect(req.request.method).toBe('GET');
    req.flush(listTrackMock);
  })

  it('getFavorites should get a object and it have to be a get method', ()=>{
    service.getFavorites().subscribe(res=>{
      expect(res).toEqual(listTrackMock.tracks);
    })

    const req = httpMock.expectOne(environment.urlPlaylist + "/me/tracks");
    expect(req.request.method).toBe('GET');
    req.flush(listTrackMock.tracks);
  })

  it('deleteFavorite should delete a track and it have to be a delete method', ()=>{
    service.deleteFavorite(trackMock.id).subscribe(res=>{
      expect(res).toEqual(null);
      
    })

    const req = httpMock.expectOne(environment.urlPlaylist+'/me/tracks?ids=' +trackMock.id);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  })

  it('putFavorite should put a id and it have to be a put method', ()=>{
    service.putFavorite(trackMock.id).subscribe(res=>{
      expect(res).toEqual(null);
    })

    const req = httpMock.expectOne(environment.urlPlaylist+'/me/tracks?ids=' +trackMock.id);
    expect(req.request.method).toBe('PUT');
    req.flush(null);
  })

  it('checkFavoritesGroup should get a boolean array and it have to be a get method', ()=>{
    service.checkFavoritesGroup(trackMock.id).subscribe(res=>{
      expect(res).toEqual([true]);
    })

    const req = httpMock.expectOne(environment.urlPlaylist+'/me/tracks/contains?ids=' +trackMock.id);
    expect(req.request.method).toBe('GET');
    req.flush([true]);
  })

  it('getDataProfile should get a object and it have to be a get method', ()=>{
    service.getDataProfile().subscribe(res=>{
      expect(res).toEqual({});
    })

    const req = httpMock.expectOne(environment.urlPlaylist + "/me");
    expect(req.request.method).toBe('GET');
    req.flush({});
  })

  
});
