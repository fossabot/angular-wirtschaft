import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Question} from '../../serv/question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
})
export class QuestionComponent implements OnInit, OnChanges {

  @Input()
  question: Question;

  @Input()
  checkedAnswers: string[] = [];

  @Input()
  showSolution = false;

  @Output()
  checkedAnswersChanged = new EventEmitter<string[]>();

  get isRadio() {
    return this.question.type === 'radio';
  }

  get type() {
    return this.isRadio ? 'Single-Choice Frage' : 'Multi-Choice Frage';
  }

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.question) {
      this.checkedAnswers = [];
      this.checkedAnswersChanged.emit([]);
    }
  }

  isSelected(answer: string) {
    return this.checkedAnswers.indexOf(answer) >= 0;
  }

  isCorrect(answer: string) {
    return this.showSolution && this.question.correctAnswers.indexOf(answer) >= 0;
  }

  selected(answer: string, checked: boolean) {
    if (checked) {
      if (this.isRadio) {
        this.checkedAnswers = [answer];
      } else {
        this.checkedAnswers.push(answer);
      }
    } else {
      const index = this.checkedAnswers.indexOf(answer);
      this.checkedAnswers.splice(index, 1);
    }
    this.checkedAnswersChanged.emit(this.checkedAnswers);
  }
}
