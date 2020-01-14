import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(){}

  addLoaded(){
    var class_name = document.getElementById('root').className;
    var loaded     = class_name.includes('loaded');
    if( !loaded )
      document.getElementById('root').classList.add('loaded');
  }
}
