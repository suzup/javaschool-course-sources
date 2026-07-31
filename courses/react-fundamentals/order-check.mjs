import { rotateChoices } from './src/choice-order.js';

const choices = [
    { id: 1, text: 'String' },
    { id: 2, text: 'int' },
    { id: 3, text: 'boolean' },
    { id: 4, text: 'char' }
];

for (const step of [0, 1, 2, 5, -1]) {
    console.log(`step ${String(step).padStart(2)} → ${rotateChoices(choices, step).map((choice) => choice.id).join(' ')}`);
}
