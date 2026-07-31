import { Link, useLocation } from 'react-router';

// 어떤 주소와도 맞지 않을 때 열리는 화면입니다.
function NotFoundScreen() {
    const location = useLocation();

    return (
        <section className="not-found-screen">
            <h2>없는 주소입니다</h2>
            <p className="board-message">{location.pathname} 주소에 연결된 화면이 없습니다.</p>
            <ul>
                <li><Link to="/quiz">퀴즈 화면</Link></li>
                <li><Link to="/records">내 기록</Link></li>
            </ul>
        </section>
    );
}

export default NotFoundScreen;
