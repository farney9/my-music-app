import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { UserMock } from 'custom/models/mocks';
import { AuthService } from 'custom/services/auth.service';
import { AuthGuard } from './auth.guard';

import { PagesGuard } from './pages.guard';

class componentRouteTesting  {}


describe('PagesGuard', () => {
  let guard: PagesGuard;
  let router: Router;
  let authService: AuthService
  let routeMock: any = { snapshot: {}};
  let routeStateMock: any = { snapshot: {}, url: '/pages/home'};
  let routerMock : any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          {
            path: 'pages/home',
            component: componentRouteTesting 
          }
        ])],
      providers: [AuthService, AuthGuard],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ]
    });
    guard = TestBed.inject(PagesGuard);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router)
    routerMock = {navigate: jest.spyOn(router, 'navigate')}
  });
  afterEach(() => {
    jest.resetAllMocks();
  })

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('guard should return false and redirect to home', ()=>{
    sessionStorage.setItem('user_login',JSON.stringify(UserMock));
    expect(guard.canActivate(routeMock, routeStateMock)).toEqual(false);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/pages/home']);
  });

  it('guard should return true', ()=>{
    authService.deleteUser();
    expect(guard.canActivate(routeMock, routeStateMock)).toEqual(true);
  });
});
