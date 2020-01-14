import { Injectable, Inject } from '@angular/core';
import { ApiService } from '../../services/api.service';
import * as safeUrlAssembler from 'safe-url-assembler';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class DashboardService {
  protected baseUrl = safeUrlAssembler(environment.baseUrl);
  
  constructor(
    private apiService: ApiService
  ) {}

  /**
   * To get the user info 
   */
  public getUserData(Id): Promise<any[]> {
    let apiEndpoint = this.baseUrl.template('/:path/:endpoint')
    .param('path', 'user')
    .param('endpoint', 'get-user-data')
    .query({
      id: Id
    }).toString();
    return this.apiService.get(apiEndpoint);
  }
}