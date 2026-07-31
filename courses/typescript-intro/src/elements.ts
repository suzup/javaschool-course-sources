// document.querySelector는 요소를 찾지 못하면 null을 돌려줍니다.
// 화면 코드에서 요소를 쓸 때마다 null을 확인하지 않으려면
// 찾는 자리를 한곳으로 모으고 여기서 한 번만 확인합니다.
//
// 어떤 요소인지도 부르는 쪽이 정합니다. HTMLInputElement로 받으면
// value를 읽을 수 있고, 그냥 Element로 받으면 읽을 수 없습니다.
export const requireElement = <T extends Element>(selector: string): T => {
    const element = document.querySelector<T>(selector);
    if (element === null) {
        throw new Error(`화면에 ${selector} 요소가 없습니다.`);
    }
    return element;
};
