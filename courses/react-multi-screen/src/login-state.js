// 로그인 응답을 화면 안내로 바꾸는 규칙입니다. 화면과 떨어져 있으므로 node로 확인할 수 있습니다.
export const loginFeedback = (response) => {
    if ('error' in response) {
        // 서버는 이름이 없는 경우와 비밀번호가 틀린 경우를 구분해 알리지 않습니다.
        return { failed: true, message: '이름 또는 비밀번호가 맞지 않습니다.' };
    }
    return { failed: false, message: `${response.data.member.name} 님으로 로그인했습니다.` };
};
