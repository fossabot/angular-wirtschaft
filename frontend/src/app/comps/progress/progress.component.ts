import {Component, Input, OnInit} from '@angular/core';
import {GameStateProgress} from '../../serv/state.service';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {

  @Input()
  progress: GameStateProgress;

  constructor() { }

  ngOnInit() {
  }

}
