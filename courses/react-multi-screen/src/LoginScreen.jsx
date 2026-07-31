import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useSession } from './session-context.js';
import { arrivalOf } from './guard.js';
import { loginFeedback } from './login-state.js';

function LoginScreen() {
    const { member, login } = useSession();
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [feedback, setFeedback] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    const submit = async (event) => {
        event.preventDefault();
        const response = await login(name, password);
        setFeedback(loginFeedback(response));
        if ('error' in response) {
            return;
        }
        // 원래 열려던 주소로 되돌립니다. replace를 쓰면 뒤로 가기가 로그인 화면으로 돌아오지 않습니다.
        navigate(arrivalOf(location.state), { replace: true });
    };

    return (
        <section className="login-screen">
            <h2>로그인</h2>
            {member && <p className="board-message">{member.name} 님으로 로그인한 상태입니다.</p>}
            <form onSubmit={submit}>
                <input aria-label="이름" value={name} onChange={(event) => setName(event.target.value)} />
                <input
                    aria-label="비밀번호"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
                <button type="submit">로그인</button>
            </form>
            {feedback?.failed && <p className="board-error">{feedback.message}</p>}
        </section>
    );
}

export default LoginScreen;
