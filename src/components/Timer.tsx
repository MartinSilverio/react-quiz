import { Dispatch, useEffect } from 'react';
import { QuestionActions } from '../types';

function Timer({
    dispatch,
    secondsRemaining,
}: {
    dispatch: Dispatch<QuestionActions>;
    secondsRemaining: number;
}) {
    const minutes = Math.floor(secondsRemaining / 60);
    const seconds = secondsRemaining % 60;

    useEffect(
        function () {
            const timer = setInterval(function () {
                console.log('tick');
                dispatch({ type: 'tick' });
            }, 1000);

            return () => {
                clearInterval(timer);
            };
        },
        [dispatch]
    );

    return (
        <div className="timer">
            {minutes.toString().padStart(2, '0')}:
            {seconds.toString().padStart(2, '0')}
        </div>
    );
}

export default Timer;
