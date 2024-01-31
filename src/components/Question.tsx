import Options from './Options';
import { QuestionActions, QuestionType } from '../types';
import { Dispatch } from 'react';

function Question({
    question,
    dispatch,
    answer,
}: {
    question: QuestionType;
    dispatch: Dispatch<QuestionActions>;
    answer: number | null;
}) {
    return (
        <div>
            <h4>{question.question}</h4>
            <Options question={question} dispatch={dispatch} answer={answer} />
        </div>
    );
}

export default Question;
