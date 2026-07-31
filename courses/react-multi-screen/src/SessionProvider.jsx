import { useEffect, useState } from 'react';
import { fetchMe, sendLogin, sendLogout } from './api.js';
import { addRecord, emptyRecords } from './session-records.js';
import { SessionContext } from './session-context.js';

// 로그인한 사람과 이번 접속에서 푼 결과를 담아 아래 화면들에 내려 줍니다.
export function SessionProvider({ children }) {
    const [member, setMember] = useState(null);
    // 서버에 한 번 물어보기 전에는 로그인 여부를 모르는 상태입니다.
    const [checked, setChecked] = useState(false);
    const [records, setRecords] = useState(emptyRecords);

    useEffect(() => {
        let cancelled = false;
        fetchMe().then((response) => {
            if (cancelled) {
                return;
            }
            setMember('data' in response ? response.data : null);
            setChecked(true);
        });
        return () => {
            cancelled = true;
        };
    }, []);

    const login = async (name, password) => {
        const response = await sendLogin(name, password);
        if ('error' in response) {
            return response;
        }
        setMember(response.data.member);
        return response;
    };

    const logout = async () => {
        await sendLogout();
        setMember(null);
        setRecords(emptyRecords);
    };

    // 퀴즈 화면이 채점 결과를 넣고, 기록 화면이 같은 값을 읽습니다.
    const rememberAnswer = (questionId, result) => {
        setRecords((previous) => addRecord(previous, questionId, result));
    };

    return (
        <SessionContext.Provider value={{ member, checked, records, login, logout, rememberAnswer }}>
            {children}
        </SessionContext.Provider>
    );
}
