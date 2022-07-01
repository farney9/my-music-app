import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/compiler';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CommonService } from 'custom/services/common.service';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { UserMock, AuthTokenMock, ProfileResponse, codeMock } from "custom/models/mocks";
import { of } from 'rxjs';

const { location } = window;
const getHrefSpy = jest.fn(() => 'google.com/test?code=12345678');
const setHrefSpy = jest.fn(href => href);

const getSearchSpy = jest.fn(() => 'code=12345678');
// const setSearchSpy = jest.fn(search => search);

const setPushStateSpy = jest.fn(push => push);

const onloadResponse = {
  status: 200,
  responseText: JSON.stringify(AuthTokenMock)
}

const xhrMock: Partial<XMLHttpRequest> = {
  open: jest.fn(),
  send: jest.fn(),
  setRequestHeader: jest.fn(),
  readyState: 4,
  status: 200,
  response: 'Hello World!'
};

describe('AuthService', () => {
  let service: AuthService;
  let commonService: CommonService;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService, CommonService],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ]
    });
    service = TestBed.inject(AuthService);
    commonService = TestBed.inject(CommonService);
  });

  beforeEach(() => {

    delete (window as any).location;
    (window as any).location = {}

    Object.defineProperty(window.location, 'href', {
      get: getHrefSpy,
      set: setHrefSpy,
    });

    Object.defineProperty(window.location, 'pushState', {
      set: setPushStateSpy,
    });


  })

  afterAll(() => {
    window.location = location;
  })

  afterEach(() => {
    jest.resetAllMocks();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('authorizeAccess should execute window.location.href', () => {
    service.authorizeAccess();
    expect(setHrefSpy).toHaveBeenCalled();
  })

  it('handleRedirect test flow', () => {
    let spy1 = jest.spyOn((service as any), 'getCode').mockReturnValueOnce(('123'));
    jest.spyOn(window, 'XMLHttpRequest').mockImplementation(() => xhrMock as XMLHttpRequest);

    service.handleRedirect();
    expect(spy1).toHaveBeenCalled();
    expect(xhrMock.open).toBeCalledWith('POST', environment.urlToken, true);
    expect(xhrMock.setRequestHeader).toBeCalledWith('Content-Type', 'application/x-www-form-urlencoded');
    expect(xhrMock.setRequestHeader).toBeCalledWith('Authorization', 'Basic ' + btoa(environment.idClient + ":" + environment.secretClient));
    expect(xhrMock.send).toBeCalled()
  })

  it('handleAuthorizationResponse flow', ()=>{
    let spy1 = jest.spyOn(commonService, 'getDataProfile').mockReturnValueOnce(of(ProfileResponse));

    service["handleAuthorizationResponse"](onloadResponse);
    expect(spy1).toHaveBeenCalled();
    expect(service.getUser() !== null && service.getUser() !== 'null').toBe(true);
  })

  it('deleteUser function delete from session storage', ()=>{
    sessionStorage.setItem('user_login',JSON.stringify(UserMock));
    service.deleteUser();
    expect(service.getUser() == 'null' || service.getUser() == null).toBe(true)
  })

  it('getToken and deleteToken functions works from session storage', ()=>{
    sessionStorage.setItem('access_token', 'token');
    expect(service.getToken() !== null && service.getToken() !== 'null').toBe(true);
    service.deleteToken();
    expect(service.getToken() == null || service.getToken() == 'null').toBe(true);
  })

  it('getCode should return a string', ()=>{
    expect((service as any).getCode(codeMock).length > 0).toBe(true);
  })

});
