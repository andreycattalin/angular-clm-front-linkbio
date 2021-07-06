import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { Minibio } from '../shared/models/minibio';
import { MinibioService } from '../shared/services/minibio.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-bio',
  templateUrl: './create-bio.component.html',
  styleUrls: ['./create-bio.component.scss']
})
export class CreateBioComponent implements OnInit {

  bioForm: FormGroup
  isEditMode = false
  bioId?: any

  constructor(private fb: FormBuilder, private notifier: NotifierService, private minibioService: MinibioService, private router: Router, private route: ActivatedRoute) {
//    const reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

    this.bioForm = this.fb.group({
      title: ["", Validators.required],
      description: ["", Validators.required],
      image: ["", Validators.required],
      linkTitle1: ["", Validators.required],
      linkUrl1: ["", Validators.required],
      linkTitle2: ["", Validators.required],
      linkUrl2: ["", Validators.required],
      linkTitle3: ["", Validators.required],
      linkUrl3: ["", Validators.required],
    })

    this.bioId = this.route.snapshot.paramMap.get('id') // Leemos el parametro de la url
    if(this.bioId) { // si está en modo edicion
      this.isEditMode = true

      this.minibioService.getMiniBio(this.bioId).subscribe(data => {

        const minibio: any = data.data()
        minibio.id = data.id

        this.bioForm.patchValue(minibio)

      })
    }
  }

  ngOnInit() {

  }

  get f() {
    return this.bioForm.controls
  }

  saveMinibio() {

    if(this.bioForm.invalid) {
      this.notifier.notify('error', 'Los datos no son válidos');
      return
    }

    console.log("Guardar minibio", this.bioForm.value)

    this.minibioService.createMinibio(this.bioForm.value).then(success => {
      this.notifier.notify('success', "Todo ok!")
      this.router.navigate(["/profile"])
    }).catch(error =>  {
      this.notifier.notify('error', 'Ups, ha ocurrido un error');
    })
  }

  updateMinibio() {

    if(this.bioForm.invalid) {
      this.notifier.notify('error', 'Los datos no son válidos');
      return
    }

    console.log("Actualizar minibio", this.bioForm.value)

    this.minibioService.updateMinibio(this.bioId, this.bioForm.value).then(success => {
      this.notifier.notify('success', "Actualizado!")
      this.router.navigate(["/profile"])
    }).catch(error =>  {
      this.notifier.notify('error', 'Ups, ha ocurrido un error');
    })
  }

}
