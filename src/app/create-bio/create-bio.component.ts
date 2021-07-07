import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { Minibio } from '../shared/models/minibio';
import { MinibioService } from '../shared/services/minibio.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-create-bio',
  templateUrl: './create-bio.component.html',
  styleUrls: ['./create-bio.component.scss']
})
export class CreateBioComponent implements OnInit {

  bioForm: FormGroup
  isEditMode = false
  bioId?: any

  uploadPercent: Observable<any> | undefined;
  downloadURL: Observable<string> | undefined;
  percent = 0
  mainImage?: string

  constructor(private storage: AngularFireStorage ,private fb: FormBuilder, private notifier: NotifierService, private minibioService: MinibioService, private router: Router, private route: ActivatedRoute) {
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

        console.log( minibio.image)
        this.mainImage = minibio.image

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

  uploadFile(event: any) {
    const file = event.target.files[0];
    const filePath = Date.now() + file.name;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file)

    // observe percentage changes
    task.percentageChanges().subscribe(number => {
      this.percent = number!
    })
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL()

          this.downloadURL.subscribe(data => {
            this.bioForm.patchValue({
              image: data
            })
          })

        })
     )
    .subscribe()
  }
}
