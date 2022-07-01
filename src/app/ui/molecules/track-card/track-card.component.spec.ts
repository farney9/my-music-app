import { ComponentFixture, TestBed } from '@angular/core/testing';
import { trackMock } from 'custom/models/mocks';
import { TimeSongPipe } from 'custom/pipes/time-song.pipe';

import { TrackCardComponent } from './track-card.component';


describe('TrackCardComponent', () => {
  let component: TrackCardComponent;
  let fixture: ComponentFixture<TrackCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackCardComponent, TimeSongPipe]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('clickIcon should return a cardData', () => {
    component.card = trackMock;
    component.clickIcon();
    expect(component.cardData).toEqual(trackMock);
  });
});
