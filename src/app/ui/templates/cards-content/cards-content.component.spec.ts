import { ComponentFixture, TestBed } from '@angular/core/testing';
import { trackMockFormatedList } from 'custom/models/mocks';

import { CardsContentComponent } from './cards-content.component';

describe('CardsContentComponent', () => {
  let component: CardsContentComponent;
  let fixture: ComponentFixture<CardsContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardsContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('cards should get a TrackData list', ()=>{
    component.cards = trackMockFormatedList;
    expect(component.cardList).toEqual(trackMockFormatedList);
  })
});
