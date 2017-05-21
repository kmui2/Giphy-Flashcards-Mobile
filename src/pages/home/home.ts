import { FirebaseProvider } from './../../providers/firebase/firebase';
import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
 import { Http, Response } from '@angular/http';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  // shoppingItems: FirebaseListObservable<any[]>;
    flashcards: any;
  newWord = '';
  newTranslation = '';
  user: Observable<firebase.User>;
  giphies = [];
  link = 'http://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=';
  selectedGif: any;
  constructor(
    private http: Http,
    public afAuth: AngularFireAuth, public navCtrl: NavController, public firebaseProvider: FirebaseProvider) {
    
    this.firebaseProvider.getFlashcards()
    .subscribe(flashcards =>{
      this.flashcards = flashcards
      for (let f of flashcards) {
        this.performSearch(f.translation, f);
        console.log("did search");
      }
      console.log("number of flahscards" + flashcards.length)
    }
    );
    
    // this.flashcards = this.firebaseProvider.getFlashcards();
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
  performSearch(searchTerm: string, flashcard: any): void {
    var apiLink = this.link + searchTerm;

    this.http.request(apiLink)
      .subscribe((res: Response) => {
        this.giphies = res.json().data;
        console.log(this.giphies);
        this.selectedGif = this.giphies[Math.floor(Math.random() * this.giphies.length)];
        flashcard.gif = this.selectedGif;
        return flashcard.gif;
        // console.log("This is selected: " + this.selectedGif);
      });
  }
}