export class FullQuestionRequest {
  stone_id: string;
  chosen_answer: string;
  possible_answers: string[];
}

export class QuizAnswersRequest {
  username: string;
  quiz: {
    questions: FullQuestionRequest[];
  };
}
