import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

export interface Question {
  question: string;
  answers: string[];
  comments: string[];
  type: 'radio' | 'checkbox';
  title: string;
  correctAnswers: string[];
}

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private questions: Question[];

  constructor(private http: HttpClient) {
  }

  async getQuestions(): Promise<Question[]> {
    if (!this.questions) {
      const data = await this.http.get<Question[]>('assets/data.json').toPromise();
      this.questions = Object.keys(data).map(question => ({question, ...data[question]}));
      this.questions = this.questions.filter(q => !q.comments ||
        q.comments.some(c => c && c.toLowerCase().indexOf('not approved') > 0));
    }
    return this.questions;
  }
}
