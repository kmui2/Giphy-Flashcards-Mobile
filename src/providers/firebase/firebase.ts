import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { Http, Response } from '@angular/http';
@Injectable()
export class FirebaseProvider {

  constructor(public afd: AngularFireDatabase, private http: Http) { }

  // getShoppingItems() {
  //   return this.afd.list('/shoppingItems/');
  // }
  // 
  // addItem(name) {
  //   this.afd.list('/shoppingItems/').push(name);
  // }
  // 
  // removeItem(id) {
  //   this.afd.list('/shoppingItems/').remove(id);
  // }

  title = 'Welcome to GiphySearch';
  link = 'http://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=';
  giphies = [];
  selectedGif: any;
  flashcards: any;
  getFlashcards() {
    // return this.afd.list('/flashcards/');
    return this.afd.list('/flashcards/')
    
    // .subscribe((flashcards) => {
    //   for (let f of flashcards) {
    //     this.performSearch(f.translation, f);
    //   }
    // });
  }
  
  addFlashcard(word, translation) {
    let flashcard = {
      word: word,
      translation: translation
    }
    this.afd.list('/flashcards/').push(flashcard);
  }
  removeFlashcard(id) {
    this.afd.list('/flashcards/').remove(id);
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