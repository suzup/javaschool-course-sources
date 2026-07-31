function QuizScreen({ view, children }) {
    return (
        <section className="quiz-board">
            <p className="board-message">{view.message}</p>
            {view.status === 'ready' && children}
            {view.status === 'error' && <p className="board-error">다른 번호를 눌러 주세요.</p>}
        </section>
    );
}

export default QuizScreen;
