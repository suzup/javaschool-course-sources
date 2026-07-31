import { Navigate, Route, Routes } from 'react-router';
import QuizBoard from './QuizBoard.jsx';
import LoginScreen from './LoginScreen.jsx';
import RecordsScreen from './RecordsScreen.jsx';
import RecordDetail from './RecordDetail.jsx';
import NotFoundScreen from './NotFoundScreen.jsx';
import RequireLogin from './RequireLogin.jsx';

// 주소와 화면의 짝을 한곳에 모아 둡니다.
function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/quiz" replace />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/quiz" element={<QuizBoard />} />
            <Route
                path="/records"
                element={
                    <RequireLogin>
                        <RecordsScreen />
                    </RequireLogin>
                }
            />
            <Route
                path="/records/:questionId"
                element={
                    <RequireLogin>
                        <RecordDetail />
                    </RequireLogin>
                }
            />
            {/* 위의 어느 주소와도 맞지 않으면 이 화면이 열립니다. */}
            <Route path="*" element={<NotFoundScreen />} />
        </Routes>
    );
}

export default AppRoutes;
