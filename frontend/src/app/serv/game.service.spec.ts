import {TestBed} from '@angular/core/testing';

import {GameService} from './game.service';
import {QuestionService} from './question.service';
import {StateService} from './state.service';

describe('GameService', () => {
  const state = {
    answers: {
      a: {wrongCount: 1, correctCount: 0},
      b: {wrongCount: 2, correctCount: 0},
      c: {wrongCount: 1, correctCount: 1},
    },
    index: 0,
  };

  const questions = [
    {question: 'a'},
    {question: 'b'},
    {question: 'c'},
    {question: 'd'},
  ];

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      {
        provide: QuestionService,
        useValue: {
          getQuestions: async () => questions,
        },
      },
      {
        provide: StateService,
        useValue: {
          getState: () => state,
        },
      },
    ],
  }));

  it('should be ordered', async () => {
    const service: GameService = TestBed.get(GameService);
    let question = await service.nextQuestion();

    expect(question.question).toBe('d');
    question = await service.nextQuestion();
    expect(question.question).toBe('a');
    question = await service.nextQuestion();
    expect(question.question).toBe('c');
    question = await service.nextQuestion();
    expect(question.question).toBe('b');
    question = await service.nextQuestion();
    expect(question.question).toBe('d');
  });
});
