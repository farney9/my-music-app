import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'custom/services/auth.service';
import { of } from 'rxjs';

import { LoginComponent } from './login.component';

class componentRouteTesting  {}


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let auth : AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          {
            path: 'pages/home',
            component: componentRouteTesting 
          }
        ])
      ],
      declarations: [ LoginComponent ],
      providers:[
        AuthService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    auth = fixture.debugElement.injector.get(AuthService);
    router = TestBed.inject(Router)
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('autorizateLogin should call authorizeAccess', () =>{
    let spy1 = jest.spyOn(auth, 'authorizeAccess').mockImplementation(()=>null);

    component.autorizateLogin('');
    expect(spy1).toHaveBeenCalled();
  })

  it('initOperation should call handleRedirect', ()=>{
    let spy = jest.spyOn(auth, 'handleRedirect').mockImplementation(()=>null);

    component.initOperation(1);
    expect(spy).toHaveBeenCalled();

  })

  it('redirectHomePage should go home', ()=>{
    let spy1 = jest.spyOn(router, 'navigate');
    (component as any).redirectHomePage();
    expect(spy1).toHaveBeenCalledWith(["/pages/home"])
  })
});
 