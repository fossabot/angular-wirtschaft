import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuestionComponent } from './comps/question/question.component';
import { AnswerComponent } from './comps/answer/answer.component';
import { GameComponent } from './comps/game/game.component';
import {HttpClientModule} from '@angular/common/http';
import { ProgressComponent } from './comps/progress/progress.component';

@NgModule({
  declarations: [
    AppComponent,
    QuestionComponent,
    AnswerComponent,
    GameComponent,
    ProgressComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
