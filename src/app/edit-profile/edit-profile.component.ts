import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  mForm: FormGroup

  constructor(private fb: FormBuilder, private authService: AuthService, private notifier: NotifierService) {
    this.mForm = this.fb.group({
      username: ["", [Validators.required, Validators.minLength(3)]]
    })
  }

  ngOnInit(): void {
    const name = this.authService.userData().displayName
    const username = this.authService.userData().username
    this.mForm.patchValue({
      username: username || name
    })
  }

  saveProfile() {

    if(this.mForm.invalid) {
      this.notifier.notify('error', "El nombre de usuario no es correcto")
      return
    }

    // guardar datos en firebase y en local
    this.authService.updateProfile(this.mForm.value).then( success => {
      this.notifier.notify('success', "¡Datos actualizados!")
      this.authService.updateLocalData(this.mForm.value)
      setTimeout(function(){
        window.location.reload()
       }, 500);
    }).catch(error => {
      this.notifier.notify('error', "Ha ocurrido un error")
    })
  }

}
