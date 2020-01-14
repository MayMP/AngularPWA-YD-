import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class LoadingService {

  isShow: boolean;

  constructor() {  }

  show() {
    this.isShow = true;
  }

  hide() {
    this.isShow = false;
  }
}