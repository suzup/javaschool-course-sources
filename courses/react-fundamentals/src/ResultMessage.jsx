function ResultMessage({ result }) {
    if (result === null) {
        return null;
    }
    return (
        <p className={result.correct ? 'result correct' : 'result wrong'}>
            {result.correct
                ? `정답입니다. ${result.explanation}`
                : `오답입니다. 정답은 ${result.correctChoiceId}번입니다. ${result.explanation}`}
        </p>
    );
}

export default ResultMessage;
