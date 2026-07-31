// 보호된 자리에서 무엇을 할지 정하는 규칙입니다. 화면과 떨어져 있으므로 node로 바로 실행해 확인할 수 있습니다.
export const guardDecision = ({ checked, member, pathname }) => {
    // 서버에 묻는 중에는 판단하지 않습니다. 여기서 보내면 로그인한 사람도 쫓겨납니다.
    if (!checked) {
        return { status: 'checking' };
    }
    if (!member) {
        return { status: 'redirect', to: '/login', from: pathname };
    }
    return { status: 'allow' };
};

// 로그인 뒤에 돌아갈 자리입니다. 보호된 화면이 보내 준 주소가 없으면 퀴즈 화면으로 갑니다.
export const arrivalOf = (state) => state?.from ?? '/quiz';
