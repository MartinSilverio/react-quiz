type Status = 'loading' | 'error' | 'ready' | 'active' | 'finished';

export interface QuestionType {
    correctOption: number;
    id: string;
    options: string[];
    points: number;
    question: string;
}
// Dispatch Action Types
interface ActionDataReceived {
    type: 'dataReceived';
    payload: QuestionType[];
}
interface ActionDataFailed {
    type: 'dataFailed';
}
interface ActionStart {
    type: 'start';
}

interface ActionNewAnswer {
    type: 'newAnswer';
    payload: number;
}

interface ActionNextQuestion {
    type: 'nextQuestion';
}

interface ActionFinish {
    type: 'finish';
}

interface ActionRestart {
    type: 'restart';
}

interface ActionTick {
    type: 'tick';
}

export type QuestionActions =
    | ActionDataReceived
    | ActionDataFailed
    | ActionStart
    | ActionNewAnswer
    | ActionNextQuestion
    | ActionFinish
    | ActionRestart
    | ActionTick;

//App State
export interface AppState {
    questions: QuestionType[];
    status: Status;
    index: number;
    answer: number | null;
    points: number;
    highScore: number;
    secondsRemaining: number;
}
