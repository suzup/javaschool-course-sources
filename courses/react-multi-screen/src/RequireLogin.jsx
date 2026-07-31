import { Navigate, useLocation } from 'react-router';
import { useSession } from './session-context.js';
import { guardDecision } from './guard.js';

// 로그인한 사람만 들어갈 수 있는 자리를 감쌉니다. 판단은 guardDecision이 하고 여기서는 그 결과만 화면으로 바꿉니다.
function RequireLogin({ children }) {
    const { member, checked } = useSession();
    const location = useLocation();
    const decision = guardDecision({ checked, member, pathname: location.pathname });

    if (decision.status === 'checking') {
        return <p className="board-message">로그인 상태를 확인하는 중입니다.</p>;
    }
    if (decision.status === 'redirect') {
        // 열려던 주소를 함께 보내 로그인 뒤에 그 자리로 돌아오게 합니다.
        return <Navigate to={decision.to} state={{ from: decision.from }} replace />;
    }
    return children;
}

export default RequireLogin;
