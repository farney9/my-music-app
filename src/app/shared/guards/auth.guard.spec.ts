import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { UserMock } from 'custom/models/mocks';
import { AuthService } from 'custom/services/auth.service';

import { AuthGuard } from './auth.guard';

class componentRouteTesting  {}


describe('AuthGuard', () => {
  let guard: AuthGuard;
  let router: Router;
  let authService: AuthService
  let routeMock: any = { snapshot: {}};
  let routeStateMock: any = { snapshot: {}, url: '/pages'};
  let routerMock : any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          {
            path: 'pages',
            component: componentRouteTesting 
          }
        ])],
      providers: [AuthService, AuthGuard],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ]
    });
    guard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router)
    routerMock = {navigate: jest.spyOn(router, 'navigate')}
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('guard should return false and redirect to login', ()=>{
    authService.deleteUser();
    expect(guard.canActivate(routeMock, routeStateMock)).toEqual(false);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/pages']);
  });

  it('guard should return true', ()=>{
    sessionStorage.setItem('user_login',JSON.stringify(UserMock));
    expect(guard.canActivate(routeMock, routeStateMock)).toEqual(true);
  });
});
