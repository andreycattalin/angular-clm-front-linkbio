import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { User } from '../shared/models/user';
import { MinibioService } from '../shared/services/minibio.service';
import { Minibio } from '../shared/models/minibio';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: any
  allBios: Array<Minibio> = []

  constructor(private authService: AuthService, private minibioService: MinibioService, private notifier: NotifierService, private router: Router) { }

  ngOnInit() {
    this.user = this.authService.userData()
    this.loadAllMinibios()
  }

  logout() {
    this.authService.signOut()
  }

  loadAllMinibios() {
    this.minibioService.loadMinibios().subscribe(data => {

      this.allBios = [] // lo vaciamos

      data.forEach((item: any) => {

        const newBio = item.data()
        newBio.id = item.id

        this.allBios.push(newBio)
      })

    })
  }

  deleteBio(id: any) {
    this.minibioService.deleteBio(id).then(success => {
      this.notifier.notify('success', "Minibio eliminada")
      this.loadAllMinibios()
    }).catch(error => {
      console.error("Ha ido algo mal..")
    })
  }


  editBio(id: any) {
    this.router.navigate(["edit-bio/" + id])
  }

  visit(id: any) {
    const uid = this.authService.userData().uid
    this.router.navigate(["bio/" + uid + "/" + id])
  }
}

