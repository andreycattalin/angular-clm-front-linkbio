import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { User } from '../models/user';
import fireapp from 'firebase/app';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireStore: AngularFirestore, private fireAuth: AngularFireAuth, private router: Router) { }

  setUserData(user: any) {
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    return this.fireStore.collection('users').doc(user.uid).set(userData, {
      merge: true
    }).then(success => {
      this.getCurrentUser()
    })
  }

  updateProfile(user: any) {
    const uid = this.userData().uid
    return this.fireStore.collection('users').doc(uid).set(user, {
      merge: true
    })
  }

  updateLocalData(user: any) {
    const data = this.userData()
    data.username = user.username

    localStorage.setItem('user', JSON.stringify(data));
  }

  getCurrentUser() {
    const uid = this.userData().uid
    this.fireStore.collection('users').doc(uid).get().subscribe(data => {
      this.updateLocalData(data.data())
    })
  }

  googleAuth(): Promise<any> {
    return this.fireAuth.signInWithPopup(new fireapp.auth.GoogleAuthProvider())
     .then((result) => {
       localStorage.setItem('user', JSON.stringify(result.user));
       this.setUserData(result.user);
     }).catch((error) => {
        throwError(error)
     })
  }

  isLoggedIn(): boolean {
    const user = localStorage.getItem('user');
    if(user) {
      return true
    }
    return false
  }

  userData(): User {
    return JSON.parse(localStorage.getItem('user')!)
  }

  signOut() {
    return this.fireAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['/']);
    })
  }

}
