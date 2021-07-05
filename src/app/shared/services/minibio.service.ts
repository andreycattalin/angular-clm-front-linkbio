import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Minibio } from '../models/minibio';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MinibioService {

  constructor(private fireStore: AngularFirestore, private authService: AuthService) { }

  createMinibio(data: any) {
    const uid = this.authService.userData().uid
    return this.fireStore.collection('users').doc(uid).collection('minibios').add(data)
  }

}
