import { Injectable, OnDestroy} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class HeaderService implements OnDestroy {
  constructor() {  }

  ngOnDestroy(){}

}