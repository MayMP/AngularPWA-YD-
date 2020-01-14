import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as safeUrlAssembler from 'safe-url-assembler';
import { environment } from '../../environments/environment';

// Store data in project
import { Store, select } from '@ngrx/store';
import { UserModule } from '../modules/user.module';
import { UserState } from '../store/reducers/user.reducer';
import { resolve, reject } from 'q';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  state: UserModule;
  option: any = {
    'Content-Type': 'application/json',
    'api-key': environment.APIKey
  };

  protected baseUrl = safeUrlAssembler(environment.baseUrl);

  constructor(
    private http: HttpClient,
    private store: Store<UserState>
  ){
    this.store.pipe(select( (state: any) => state.yd.user )).subscribe(user => {
      if( user['user'] )
        this.state = user['user'];
    });
  }

  public get(url: string): Promise<any> {
    const headerOptions: HttpHeaders = new HttpHeaders().set('api-key', environment.APIKey);
    return this.http.get(url, {
      headers: headerOptions
    }).toPromise().then(res => {
      if( res['success'] === true )
        return res['data'];
    }).catch(error => console.log(error, " >>>>> error "));
  }

  /** 
   * To get user details information with its email 
   * @param email
   */
  public getUser(email?: any) {
    var apiEndpoint = this.baseUrl.template('/:path/:endpoint')
    .param('path', 'user')
    .param('endpoint', 'get-user')
    .query({
      email: email
    }).toString();
    return this.get(apiEndpoint);
  }

  public post( url: string, body?: any ) {
    body['id'] = this.state.id;
    return new Promise((resolve, reject) => {
      const headerOptions: HttpHeaders = new HttpHeaders(this.option);

      body = body || {};
      const postBody = Object.assign(body, {});

      this.http.post(url, JSON.stringify(postBody), {
        headers: headerOptions
      }).subscribe((data: any) => {
        resolve(data);
      }, error => {
        reject(error);
      });
    });
  }
}