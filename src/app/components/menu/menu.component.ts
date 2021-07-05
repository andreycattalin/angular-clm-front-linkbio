import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  user: any

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.user = this.authService.userData()
  }

  logout() {
    this.authService.signOut()
  }
}
