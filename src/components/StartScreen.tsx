import { Dispatch } from 'react';
import { QuestionActions } from '../types';

export default function StartScreen({
    numQuestions,
    dispatch,
}: {
    numQuestions: number;
    dispatch: Dispatch<QuestionActions>;
}) {
    return (
        <div className="start">
            <h2>Welcome to The React Quiz</h2>
            <h3>{numQuestions} questions to test your mastery</h3>
            <button
                className="btn btn-ui"
                onClick={() => dispatch({ type: 'start' })}
            >
                Let's start
            </button>
        </div>
    );
}
