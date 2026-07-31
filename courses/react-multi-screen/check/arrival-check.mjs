// 로그인하지 않은 사람이 기록 주소를 열었을 때 도착하는 자리를 순서대로 확인합니다.
// 화면 이동은 브라우저가 하지만, 어디로 보내고 어디로 돌아올지는 이 두 함수가 정합니다.
import { guardDecision, arrivalOf } from '../src/guard.js';
import { sendLogin } from '../src/api.js';

const 열려던주소 = '/records/3';

const 판단 = guardDecision({ checked: true, member: null, pathname: 열려던주소 });
console.log('1. 열려던 주소'.padEnd(28), 열려던주소);
console.log('2. 보호된 자리의 판단'.padEnd(28), JSON.stringify(판단));
console.log('3. 보내는 주소'.padEnd(28), 판단.to);
console.log('4. 함께 보낸 값'.padEnd(28), JSON.stringify({ from: 판단.from }));

const 응답 = await sendLogin('민수', 'quiz-study-1');
console.log('5. 로그인 결과'.padEnd(28), 'error' in 응답 ? '실패' : `성공 (${응답.data.member.name})`);
console.log('6. 도착할 주소'.padEnd(28), arrivalOf({ from: 판단.from }));
console.log('   보낸 값이 없었다면'.padEnd(28), arrivalOf(undefined));
