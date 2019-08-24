import {Component, OnInit} from '@angular/core';
import {Question, QuestionService} from '../../serv/question.service';
import {GameService} from "../../serv/game.service";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  currentQuestion: Question;
  checkedAnswers = [];
  checked = false;
  checkCssClasses = '';

  constructor(private question: QuestionService,
              private game: GameService) {
  }

  ngOnInit() {
    this.next();
  }

  checkedAnswersChanged(answers: string[]) {
    this.checkedAnswers = answers;
  }

  async check() {
    const correct = await this.game.store(this.currentQuestion, this.checkedAnswers);
    if (!correct) {
      this.checked = true;
      this.checkCssClasses = 'shake';
    } else {
      this.checkCssClasses = '';
      this.next();
    }
  }

  skip() {
    this.next();
  }

  async next() {
    this.checked = false;
    this.currentQuestion = await this.game.nextQuestion();
  }
}
