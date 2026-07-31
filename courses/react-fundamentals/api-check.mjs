import { fetchQuestion } from './src/api.js';

console.log('1번 문제:', JSON.stringify(await fetchQuestion(1)));
console.log('6번 문제:', JSON.stringify(await fetchQuestion(6)));
