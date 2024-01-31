import { useEffect, useReducer } from 'react';
import Header from './components/Header';
import MainContent from './components/MainContent';
import Loader from './components/Loader';
import Error from './components/Error';
import StartScreen from './components/StartScreen';
import Question from './components/Question';
import { AppState, QuestionActions } from './types';
import NextButton from './components/NextButton';
import Progress from './components/Progress';
import FinishScreen from './components/FinishScreen';
import Footer from './components/Footer';
import Timer from './components/Timer';

const SECS_PER_QUESTION = 30;

const initialState: AppState = {
    questions: [],
    status: 'loading',
    index: 0,
    answer: null,
    points: 0,
    highScore: 0,
    secondsRemaining: -1,
};

function reducer(state: AppState, action: QuestionActions): AppState {
    switch (action.type) {
        case 'dataReceived':
            return {
                ...state,
                questions: action.payload,
                status: 'ready',
            };
        case 'dataFailed':
            return {
                ...state,
                status: 'error',
            };
        case 'start':
            return {
                ...state,
                status: 'active',
                secondsRemaining: state.questions.length * SECS_PER_QUESTION,
            };
        case 'newAnswer': {
            const currentQuestion = state.questions[state.index];
            return {
                ...state,
                answer: action.payload,
                points:
                    action.payload === currentQuestion.correctOption
                        ? state.points + currentQuestion.points
                        : state.points,
            };
        }
        case 'nextQuestion':
            return {
                ...state,
                index: state.index + 1,
                answer: null,
            };
        case 'finish':
            return {
                ...state,
                status: 'finished',
                highScore: Math.max(state.points, state.highScore),
            };
        case 'restart':
            return {
                ...state,
                index: 0,
                answer: null,
                points: 0,
                status: 'ready',
                secondsRemaining: 10,
            };
        case 'tick':
            return {
                ...state,
                secondsRemaining: state.secondsRemaining - 1,
                status:
                    state.secondsRemaining === 0 ? 'finished' : state.status,
            };
    }
}

function App() {
    const [
        {
            questions,
            status,
            index,
            answer,
            points,
            highScore,
            secondsRemaining,
        },
        dispatch,
    ] = useReducer(reducer, initialState);

    const numQuestions = questions.length;
    const totalPoints = questions.reduce((prev, question) => {
        return prev + question.points;
    }, 0);

    useEffect(function () {
        (async () => {
            try {
                const resp = await fetch('http://localhost:8000/questions');
                const data = await resp.json();

                dispatch({ type: 'dataReceived', payload: data });
                console.log(data);
            } catch (error) {
                console.error(error);
                dispatch({ type: 'dataFailed' });
            }
        })();
    }, []);

    return (
        <div className="app">
            <Header />
            <MainContent>
                {status === 'loading' && <Loader />}
                {status === 'error' && <Error />}
                {status === 'ready' && (
                    <StartScreen
                        numQuestions={numQuestions}
                        dispatch={dispatch}
                    />
                )}
                {status === 'active' && (
                    <>
                        <Progress
                            index={index}
                            numQuestions={numQuestions}
                            points={points}
                            totalPoints={totalPoints}
                            answer={answer}
                        />
                        <Question
                            question={questions[index]}
                            dispatch={dispatch}
                            answer={answer}
                        />
                        <Footer>
                            <Timer
                                dispatch={dispatch}
                                secondsRemaining={secondsRemaining}
                            />
                            <NextButton
                                dispatch={dispatch}
                                answer={answer}
                                index={index}
                                numQuestions={numQuestions}
                            />
                        </Footer>
                    </>
                )}
                {status === 'finished' && (
                    <FinishScreen
                        points={points}
                        totalPoints={totalPoints}
                        highScore={highScore}
                        dispatch={dispatch}
                    />
                )}
            </MainContent>
        </div>
    );
}

export default App;
