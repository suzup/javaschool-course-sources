import { readChoiceId } from './src/answer-input.js';

for (const typed of ['', '3', ' 3 ', '0', '5', '2.5', 'three']) {
    console.log(`입력 "${typed}" → ${readChoiceId(typed)}`);
}
