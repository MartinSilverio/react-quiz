import { Dispatch } from 'react';
import { QuestionActions, QuestionType } from '../types';

function Options({
    question,
    dispatch,
    answer,
}: {
    question: QuestionType;
    dispatch: Dispatch<QuestionActions>;
    answer: number | null;
}) {
    const hasAnswered = answer !== null;

    return (
        <div className="options">
            {question.options.map((option, ndx) => (
                <button
                    className={`btn btn-option ${
                        ndx === answer ? 'answer' : ''
                    } ${
                        hasAnswered
                            ? ndx === question.correctOption
                                ? 'correct'
                                : 'wrong'
                            : ''
                    }`}
                    key={option}
                    onClick={() =>
                        dispatch({ type: 'newAnswer', payload: ndx })
                    }
                    disabled={hasAnswered}
                >
                    {option}
                </button>
            ))}
        </div>
    );
}

export default Options;
