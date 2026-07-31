function ScoreBoard({ correctCount, answeredCount }) {
    return (
        <div className="score-board">
            {answeredCount > 0 && <p>현재 점수: {correctCount} / {answeredCount}</p>}
        </div>
    );
}

export default ScoreBoard;
