import { createContext, useContext } from 'react';

// 세 화면이 함께 보는 값을 담는 자리입니다.
// 화면 컴포넌트가 아닌 것은 이 파일에 두어야 새로 고침 없이 고치는 기능(Fast Refresh)이 동작합니다.
export const SessionContext = createContext(null);

// 화면마다 서버에 다시 묻지 않고 이 값을 읽습니다.
export const useSession = () => useContext(SessionContext);
