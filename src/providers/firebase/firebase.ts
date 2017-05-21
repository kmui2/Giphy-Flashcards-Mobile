import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
 
@Injectable()
export class FirebaseProvider {
 
  constructor(public afd: AngularFireDatabase) { }
 
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
  
  getFlashcards() {
    return this.afd.list('/flashcards/');
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
}