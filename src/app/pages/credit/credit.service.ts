import { Injectable, Inject } from '@angular/core';
import { ApiService } from '../../services/api.service';
import * as safeUrlAssembler from 'safe-url-assembler';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class CreditService {
  protected baseUrl = safeUrlAssembler(environment.baseUrl);

  constructor(
    private apiService: ApiService
  ){}


  /**
   * To post the credit data
   */
  public updateCreditData( creditData?: any ){
    let apiEndpoint = this.baseUrl.template('/:path/:endpoint')
    .param('path', 'user')
    .param('endpoint', 'update-credit').toString();
    return this.apiService.post(apiEndpoint, creditData);
  }
}