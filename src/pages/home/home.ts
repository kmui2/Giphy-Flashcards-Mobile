import { FirebaseProvider } from './../../providers/firebase/firebase';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
 
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  // shoppingItems: FirebaseListObservable<any[]>;
    flashcards: FirebaseListObservable<any[]>;
  newWord = '';
  newTranslation = '';
  user: Observable<firebase.User>;
  constructor(public afAuth: AngularFireAuth, public navCtrl: NavController, public firebaseProvider: FirebaseProvider) {
    this.flashcards = this.firebaseProvider.getFlashcards();
  }
 
  addFlashcard() {
    this.firebaseProvider.addFlashcard(this.newWord, this.newTranslation);
  }
 
  removeItem(id) {
    this.firebaseProvider.removeFlashcard(id);
  }

  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}