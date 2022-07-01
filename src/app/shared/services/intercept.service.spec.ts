import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { listTrackMock } from 'custom/models/mocks';
import { AuthService } from 'custom/services/auth.service';
import { environment } from 'src/environments/environment';
import { CommonService } from './common.service';
import { InterceptService } from './intercept.service';

class componentRouteTesting  {}


describe('InterceptService', () => {
  let service: InterceptService;
  let httpMock: HttpTestingController;
  let common: CommonService;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          {
            path: 'pages/home',
            component: componentRouteTesting 
          },
          {
            path: 'pages/favorites',
            component: componentRouteTesting 
          },
          {
            path: 'pages',
            component: componentRouteTesting 
          }
        ])],
      providers: [
        AuthService,
        InterceptService,
        CommonService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: InterceptService,
          multi: true
        }
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ]
    });
    service = TestBed.inject(InterceptService);
    httpMock = TestBed.inject(HttpTestingController);
    common = TestBed.inject(CommonService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add an Authorization header', ()=>{
    sessionStorage.setItem('access_token', 'token');

    common.getHomePlayList().subscribe(res=>{
      expect(res).toEqual(listTrackMock);
    });

    const req = httpMock.expectOne(environment.urlPlaylist + "/playlists/3lJwVZWRmKWLcrXvEkH31v");

    expect(req.request.headers.has('authorization')).toEqual(true);
  })
});
