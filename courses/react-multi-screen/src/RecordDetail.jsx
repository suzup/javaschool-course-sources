import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { fetchQuestion } from './api.js';
import { useSession } from './session-context.js';
import { findRecord, recordSummary } from './session-records.js';
import { loadingView, nextView } from './screen-state.js';

function RecordDetail() {
    // 주소의 :questionId 자리에 적힌 값을 글자로 받습니다.
    const { questionId } = useParams();
    const { records } = useSession();
    const [view, setView] = useState(() => loadingView(questionId));

    useEffect(() => {
        let cancelled = false;
        setView(loadingView(questionId));
        fetchQuestion(questionId).then((response) => {
            if (!cancelled) {
                setView(nextView(response));
            }
        });
        return () => {
            cancelled = true;
        };
    }, [questionId]);

    const record = findRecord(records, questionId);

    return (
        <section className="record-detail">
            <h2>{questionId}번 문제 기록</h2>
            <p className="board-message">{view.message}</p>
            {view.status === 'ready' && <p className="question-text">{view.question.question}</p>}
            {view.status === 'error' && <p className="board-error">기록을 열 수 없는 번호입니다.</p>}
            {record ? (
                <p className="record-summary">{recordSummary(record)}</p>
            ) : (
                <p className="board-message">이번 접속에서 이 문제를 푼 기록이 없습니다.</p>
            )}
            <Link to="/records">기록 목록으로</Link>
        </section>
    );
}

export default RecordDetail;
