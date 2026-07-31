import { BrowserRouter, Link } from 'react-router';
import AppRoutes from './routes.jsx';
import { SessionProvider } from './SessionProvider.jsx';
import { useSession } from './session-context.js';

// 세 화면에서 함께 쓰는 이동 링크와 로그인 상태 표시입니다.
function TopBar() {
    const { member, logout } = useSession();

    return (
        <nav className="top-bar">
            <Link to="/quiz">퀴즈</Link>
            <Link to="/records">내 기록</Link>
            {member ? (
                <>
                    <span>{member.name} 님</span>
                    <button type="button" onClick={logout}>로그아웃</button>
                </>
            ) : (
                <Link to="/login">로그인</Link>
            )}
        </nav>
    );
}

function App() {
    return (
        <BrowserRouter>
            <SessionProvider>
                <main className="page-shell">
                    <h1>Java 기초 퀴즈</h1>
                    <TopBar />
                    <AppRoutes />
                </main>
            </SessionProvider>
        </BrowserRouter>
    );
}

export default App;
