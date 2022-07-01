import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/compiler';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { listTrackMock, trackMock, trackMockFormatedList } from 'custom/models/mocks';
import { CommonService } from 'custom/services/common.service';
import { of } from 'rxjs';
import { FavoritesComponent } from './favorites.component';

describe('FavoritesComponent', () => {
  let component: FavoritesComponent;
  let fixture: ComponentFixture<FavoritesComponent>;
  let common : CommonService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ FavoritesComponent ],
      providers: [CommonService],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    common = fixture.debugElement.injector.get(CommonService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getFavorites should get and format tracks', ()=>{
    let spy1 = jest.spyOn(common, 'getFavorites').mockReturnValueOnce(of(listTrackMock.tracks));

    component.getFavorites();
    expect(spy1).toHaveBeenCalled();
    expect(component.listTracks.length > 0).toBe(true);
  });

  it('deteleFavorite should delete track from the list', ()=>{
    let spy1 = jest.spyOn(common, 'deleteFavorite').mockReturnValueOnce(of(null));

    component.listTracks = trackMockFormatedList;
    let currentLength: number = trackMockFormatedList.length;
    component.deteleFavorite(trackMock);
    expect(spy1).toHaveBeenCalled();
    expect(component.listTracks.length == currentLength-1).toBe(true);
  });
});
