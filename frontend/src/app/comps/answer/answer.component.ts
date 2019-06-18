import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css'],
})
export class AnswerComponent implements OnInit {

  @Input()
  answer: string;

  @Input()
  disabled = false;

  @Input()
  selected = false;

  @Output()
  selectedChanged = new EventEmitter<boolean>();

  @HostListener('click')
  onClick() {
    if(this.disabled) {
      return;
    }
    this.selected = !this.selected;
    this.selectedChanged.emit(this.selected);
  }

  constructor() {
  }

  ngOnInit() {
  }

}
