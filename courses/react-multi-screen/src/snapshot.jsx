import { renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import AppRoutes from './routes.jsx';
import { SessionContext } from './session-context.js';
import { addRecord, emptyRecords } from './session-records.js';

// 브라우저 없이 주소별로 어떤 화면이 만들어지는지 확인합니다.
// 서버에 묻는 부분은 실행하지 않고, 로그인 상태와 이번 접속 기록을 값으로 넣습니다.
const 민수 = { id: 1, name: '민수', joinedAt: '2026-07-31' };

const session = (member, records) => ({
    member,
    checked: true,
    records,
    login: async () => ({ data: null }),
    logout: async () => {},
    rememberAnswer: () => {}
});

const render = (url, value) =>
    renderToStaticMarkup(
        <StaticRouter location={url}>
            <SessionContext.Provider value={value}>
                <AppRoutes />
            </SessionContext.Provider>
        </StaticRouter>
    );

const 첫줄 = (html) => html.replace(/></g, '>\n<').split('\n').filter((line) => line.trim()).slice(0, 6).join(' ');

const show = (label, url, value) => console.log(`${label.padEnd(26)} ${url.padEnd(14)} ${첫줄(render(url, value))}`);

const 로그인한상태 = session(민수, addRecord(emptyRecords, '3', { selectedChoiceId: 1, correct: false, correctChoiceId: 2 }));
const 비로그인상태 = session(null, emptyRecords);

console.log('== 로그인한 상태 ==');
show('퀴즈 화면', '/quiz', 로그인한상태);
show('내 기록', '/records', 로그인한상태);
show('기록 하나', '/records/3', 로그인한상태);
show('기록 없는 번호', '/records/9', 로그인한상태);
show('없는 주소', '/recordz', 로그인한상태);

console.log('== 로그인하지 않은 상태 ==');
show('퀴즈 화면', '/quiz', 비로그인상태);
show('로그인 화면', '/login', 비로그인상태);

console.log('== 로그인 여부를 확인하는 중 ==');
show('내 기록', '/records', { ...비로그인상태, checked: false });
