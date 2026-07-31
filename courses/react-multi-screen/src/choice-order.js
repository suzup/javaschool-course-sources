// 같은 문제를 다시 풀 때 위치로 정답을 외우지 못하도록, 선택지를 정해진 규칙으로 돌려 놓습니다.
export const rotateChoices = (choices, step) => {
    const size = choices.length;
    const shift = ((step % size) + size) % size;
    return choices.map((_, index) => choices[(index + shift) % size]);
};
