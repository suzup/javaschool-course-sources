// 보호된 자리의 판단을 화면 없이 확인합니다.
import { guardDecision, arrivalOf } from '../src/guard.js';

const show = (label, value) => console.log(`${label.padEnd(34)} ${JSON.stringify(value)}`);

const 민수 = { id: 1, name: '민수' };

show('확인 중일 때', guardDecision({ checked: false, member: null, pathname: '/records' }));
show('로그인하지 않았을 때', guardDecision({ checked: true, member: null, pathname: '/records' }));
show('기록 하나를 열려 했을 때', guardDecision({ checked: true, member: null, pathname: '/records/3' }));
show('로그인했을 때', guardDecision({ checked: true, member: 민수, pathname: '/records' }));

show('보낸 주소가 있을 때 도착 자리', arrivalOf({ from: '/records' }));
show('보낸 주소가 없을 때 도착 자리', arrivalOf(undefined));
