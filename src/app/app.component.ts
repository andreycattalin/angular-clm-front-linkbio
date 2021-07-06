import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators'​;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  showMenu = false

  constructor(private router: Router) {
    router.events.subscribe(evento => {

      if( evento instanceof NavigationEnd) {
        if(this.router.url == "/" || this.router.url.includes("/bio/")) {
          this.showMenu = false
        } else {
          this.showMenu = true
        }
      }

    })
  }

}
