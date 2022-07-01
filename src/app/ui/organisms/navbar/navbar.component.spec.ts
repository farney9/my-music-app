import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/compiler';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { UserMock } from 'custom/models/mocks';
import { AuthService } from 'custom/services/auth.service';

import { NavbarComponent } from './navbar.component';

class componentRouteTesting  {}


describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let authService: AuthService;
  let router: Router;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule,
        HttpClientTestingModule,
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
        ])
      ],
      declarations: [ NavbarComponent],
      providers: [AuthService],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('verifyUserLogin should verify and existance user', ()=>{
    sessionStorage.setItem('user_login',JSON.stringify(UserMock));
    component.ngOnInit()
    expect(component.porfileData).toEqual(UserMock); 
  })
  it('goPage(FAV) should go to favorites', ()=>{
    let spy1 = jest.spyOn(router, 'navigate');
    component.goPage('FAV');
    expect(spy1).toHaveBeenCalledWith(["/pages/favorites"])
  })
  it('goPage(HOME) should go to home', ()=>{
    let spy1 = jest.spyOn(router, 'navigate');
    component.goPage('HOME');
    expect(spy1).toHaveBeenCalledWith(["/pages/home"])
  })

  it('logout should go to login', ()=>{
    let spy1 = jest.spyOn(router, 'navigate');
    let spy2 = jest.spyOn(authService, 'deleteToken').mockImplementation(()=> null);
    let spy3 = jest.spyOn(authService, 'deleteUser').mockImplementation(()=> null);

    component.logout();
    expect(spy1).toHaveBeenCalledWith(["/pages"]);
    expect(spy2).toHaveBeenCalled();
    expect(spy3).toHaveBeenCalled();
  })
});
