import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewStateService {

  viewStateSubChanged = new Subject<boolean>();

  // -------------------GLOBAL CONSTANTS----------------------
  MAIN_MENU_STUDY = 'study';
  MAIN_MENU_BEST = 'best';
  MAIN_MENU_MYHOUSE = 'myhouse';
  MAIN_MENU_TEST = 'test';
  MAIN_MENU_INFO = 'info';

  STUDY_VOCAB = 'vocabulary';
  STUDY_STORY = 'storybook';
  STUDY_GRAMMAR = 'grammar';
  STUDY_LISTEN = 'listening';
  STUDY_SPEAK = 'speaking';
  STUDY_FINAL = 'finaltest';

  // MYHOUSE_myroom = 'myhouse';
  // MYHOUSE_myroom = 'myhouse';
  // MYHOUSE_myroom = 'myhouse';
  // MYHOUSE_myroom = 'myhouse';

  private _view_state = this.MAIN_MENU_STUDY;
  private _view_state_sub = this.STUDY_VOCAB;

  constructor() { }

  get view_state(): string {
    return this._view_state;
  }

  set view_state(value: string) {
    this._view_state = value;
  }

  get view_state_sub(): string {
    return this._view_state_sub;
  }

  set view_state_sub(value: string) {
    this._view_state_sub = value;
    this.viewStateSubChanged.next(true);
  }
}
