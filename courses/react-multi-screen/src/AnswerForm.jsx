import { readChoiceId } from './answer-input.js';

function AnswerForm({ typed, onTypedChange, onSubmit, submitting, locked }) {
    const choiceId = readChoiceId(typed);

    return (
        <form
            className="answer-form"
            onSubmit={(event) => {
                event.preventDefault();
                if (choiceId !== null) {
                    onSubmit(choiceId);
                }
            }}
        >
            <label htmlFor="answer-input">정답 번호</label>
            <input
                id="answer-input"
                value={typed}
                disabled={locked}
                onChange={(event) => onTypedChange(event.target.value)}
            />
            <button type="submit" disabled={choiceId === null || submitting || locked}>정답 보내기</button>
            <p>{choiceId === null ? '화면에 있는 1부터 4까지의 번호를 골라 주세요.' : `${choiceId}번을 고른 상태입니다.`}</p>
        </form>
    );
}

export default AnswerForm;
