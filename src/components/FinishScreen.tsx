import { Dispatch } from 'react';
import { QuestionActions } from '../types';

function FinishScreen({
    points,
    totalPoints,
    highScore,
    dispatch,
}: {
    points: number;
    totalPoints: number;
    highScore: number;
    dispatch: Dispatch<QuestionActions>;
}) {
    const percentage = (points / totalPoints) * 100;

    let emoji;
    if (percentage === 100) emoji = '🥇';
    if (percentage >= 80 && percentage < 100) emoji = '😊';
    if (percentage >= 50 && percentage < 80) emoji = '😐';
    if (percentage >= 0 && percentage < 50) emoji = '😕';

    return (
        <>
            <p className="result">
                <span>{emoji}</span>You scored <strong>{points}</strong> out of{' '}
                {totalPoints} ({Math.ceil(percentage)}%)
            </p>
            <p className="highscore">(High Score: {highScore} Points)</p>
            <button
                className="btn btn-ui"
                onClick={() => dispatch({ type: 'restart' })}
            >
                Restart Quiz
            </button>
        </>
    );
}

export default FinishScreen;
