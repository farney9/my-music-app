import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import { CommonService } from 'custom/services/common.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { listTrackMock, trackMock } from "custom/models/mocks";
import { of } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let common : CommonService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [HomeComponent],
      providers: [
        CommonService,
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    common = fixture.debugElement.injector.get(CommonService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('getHomePlayList should verify favorites', ()=>{
    let spy1 = jest.spyOn(common, 'getHomePlayList').mockReturnValueOnce(of(listTrackMock));
    let spy2 = jest.spyOn(common, 'checkFavoritesGroup').mockReturnValueOnce(of([true, false]));

    component.getHomePlayList();
    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
    expect(component.listTracksCopy.length).toBe(2);
    expect((component as any).arrayGroups.length >= 1).toBe(true);
    expect(component.listTracks.length).toBe(2);
  })

  it('clickIcon false should set favorite', ()=>{
    trackMock.favorite = false;
    let spy1 = jest.spyOn(common, 'putFavorite').mockReturnValueOnce(of(null));

    component.clickIcon(trackMock);
    expect(spy1).toHaveBeenCalled();
    expect(trackMock.favorite).toBe(true);
  })

  it('clickIcon true should delete favorite', ()=>{
    trackMock.favorite = true;
    let spy1 = jest.spyOn(common, 'deleteFavorite').mockReturnValueOnce(of(null));

    component.clickIcon(trackMock);
    expect(spy1).toHaveBeenCalled();
    expect(trackMock.favorite).toBe(false);
  })

});
