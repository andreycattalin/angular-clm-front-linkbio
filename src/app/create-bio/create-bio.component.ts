import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { Minibio } from '../shared/models/minibio';
import { MinibioService } from '../shared/services/minibio.service';

@Component({
  selector: 'app-create-bio',
  templateUrl: './create-bio.component.html',
  styleUrls: ['./create-bio.component.scss']
})
export class CreateBioComponent implements OnInit {

  bioForm: FormGroup

  constructor(private fb: FormBuilder, private notifier: NotifierService, private minibioService: MinibioService) {
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

    // const miniBio: Minibio = {
    //   title: this.f.title.value,
    //   description: this.f.description.value,
    //   image: this.f.image.value,
    //   linkTitle1: this.f.linkTitle1.value,
    //   linkUrl1: this.f.linkUrl1.value,
    //   linkTitle2: this.f.linkTitle2.value,
    //   linkUrl2: this.f.linkUrl2.value,
    //   linkTitle3: this.f.linkTitle3.value,
    //   linkUrl3: this.f.linkUrl3.value
    // }

    this.minibioService.createMinibio(this.bioForm.value).then(success => {
      this.notifier.notify('success', "Todo ok!")
    }).catch(error =>  {
      this.notifier.notify('error', 'Ups, ha ocurrido un error');
    })
  }

}
