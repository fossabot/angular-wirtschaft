import { Injectable } from '@angular/core';
import {Question} from './question.service';

export interface GameState {
  answers: { [key: string]: { correctCount: number, wrongCount: number; } };
  questions: Question[];
  progress: GameStateProgress;
  index: number;
}

export interface GameStateProgress {
  total: number, unanswered: number, failed: number, correct: number
}

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private state: GameState;

  constructor() { }

  getState() {
    if (this.state) {
      return this.state;
    }

    this.state = {answers: {}, index: 0, questions: [], progress: {correct: 0, failed: 0, total: 0, unanswered: 0}};

    const answers = localStorage.getItem('answers');
    if (answers) {
      this.state.answers = JSON.parse(answers);
    }

    return this.state;
  }

  saveState() {
    localStorage.setItem('answers', JSON.stringify(this.state.answers));
  }
}
