import {Injectable} from '@angular/core';
import {Question, QuestionService} from './question.service';
import {GameState, StateService} from './state.service';


@Injectable({
  providedIn: 'root',
})
export class GameService {

  constructor(private state: StateService,
              private question: QuestionService) {

  }

  get progress() {
    return this.state.getState().progress;
  }

  async getState() {
    const state = this.state.getState();
    if (state.questions && state.questions.length > 0) {
      return state;
    }

    const questions = await this.question.getQuestions();
    state.questions = questions.sort((a, b) => {
      const answerA = state.answers[a.question];
      const answerB = state.answers[b.question];

      if (!answerA) {
        return -1;
      }
      if (!answerB) {
        return 1;
      }

      if (answerA.wrongCount !== answerB.wrongCount) {
        return answerA.wrongCount - answerB.wrongCount;
      }

      return answerA.correctCount - answerB.correctCount;
    });

    state.progress.total = questions.length;
    this.calculateProgress(state);

    return state;
  }

  async store(question: Question, answers: string[]) {
    const state = await this.getState();

    let correct = true;
    for (const answer of answers) {
      if (question.correctAnswers.indexOf(answer) === -1) {
        correct = false;
      }
    }

    if (answers.length !== question.correctAnswers.length) {
      correct = false;
    }

    if (!state.answers[question.question]) {
      state.answers[question.question] = {correctCount: 0, wrongCount: 0};
    }

    if (correct) {
      state.answers[question.question].correctCount++;
    } else {
      state.answers[question.question].wrongCount++;
    }

    this.calculateProgress(state);
    this.state.saveState();

    return correct;
  }

  private calculateProgress(state: GameState) {
    state.progress.unanswered = Math.max(0, state.questions.length - Object.keys(state.answers).length);
    state.progress.correct = Object.keys(state.answers)
      .filter(k => state.answers[k].correctCount > state.answers[k].wrongCount).length;
    state.progress.failed = Object.keys(state.answers)
      .filter(k => state.answers[k].correctCount <= state.answers[k].wrongCount).length;
  }

  async nextQuestion(): Promise<Question> {
    const state = await this.getState();
    const question = state.questions[state.index];
    state.index++;
    if (state.index >= state.questions.length) {
      state.index = 0;
    }
    return question;
  }
}
