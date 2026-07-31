import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { fetchMyStats } from './api.js';
import { useSession } from './session-context.js';
import { recordSummary } from './session-records.js';

function RecordsScreen() {
    const { member, records } = useSession();
    const [stats, setStats] = useState(null);

    useEffect(() => {
        let cancelled = false;
        fetchMyStats().then((response) => {
            if (!cancelled) {
                setStats('data' in response ? response.data : null);
            }
        });
        return () => {
            cancelled = true;
        };
    }, []);

    const solved = Object.values(records);

    return (
        <section className="records-screen">
            <h2>{member.name} 님의 기록</h2>
            {stats ? (
                <p className="board-message">
                    서버에 저장된 누적 {stats.answeredCount}번 제출 · {stats.correctCount}번 정답 · {stats.correctRate}%
                </p>
            ) : (
                <p className="board-message">누적 기록을 불러오는 중입니다.</p>
            )}
            {solved.length === 0 ? (
                <p className="board-message">이번 접속에서 푼 문제가 없습니다.</p>
            ) : (
                <ul>
                    {solved.map((record) => (
                        <li key={record.questionId}>
                            <Link to={`/records/${record.questionId}`}>{recordSummary(record)}</Link>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}

export default RecordsScreen;
