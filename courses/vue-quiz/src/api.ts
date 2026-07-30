import type { Quiz } from './types'

const quizData: Quiz = {
  id: 'vue-basics',
  title: 'Vue.js 기초 퀴즈',
  description: 'Vue 3 Composition API 기본 개념을 확인해 보세요.',
  questions: [
    {
      id: 'q1',
      text: 'Vue 3에서 반응형 상태를 만드는 함수는?',
      choices: [
        { id: 'a', text: 'reactive()' },
        { id: 'b', text: 'useState()' },
        { id: 'c', text: 'createState()' },
        { id: 'd', text: 'observable()' },
      ],
      correctChoiceId: 'a',
    },
    {
      id: 'q2',
      text: '<script setup>에서 props를 정의하는 매크로는?',
      choices: [
        { id: 'a', text: 'defineProps()' },
        { id: 'b', text: 'useProps()' },
        { id: 'c', text: 'createProps()' },
        { id: 'd', text: 'getProps()' },
      ],
      correctChoiceId: 'a',
    },
    {
      id: 'q3',
      text: 'ref()로 만든 반응형 변수의 값에 접근하는 방법은?',
      choices: [
        { id: 'a', text: '.get()' },
        { id: 'b', text: '.value' },
        { id: 'c', text: '.data' },
        { id: 'd', text: '.state' },
      ],
      correctChoiceId: 'b',
    },
    {
      id: 'q4',
      text: 'Vue Router에서 프로그래매틱 네비게이션에 사용하는 composable은?',
      choices: [
        { id: 'a', text: 'useNavigate()' },
        { id: 'b', text: 'useHistory()' },
        { id: 'c', text: 'useRouter()' },
        { id: 'd', text: 'useRoute()' },
      ],
      correctChoiceId: 'c',
    },
    {
      id: 'q5',
      text: 'computed()의 반환값은 어떤 특성을 가지는가?',
      choices: [
        { id: 'a', text: '항상 writable' },
        { id: 'b', text: '기본적으로 readonly' },
        { id: 'c', text: 'async만 지원' },
        { id: 'd', text: '배열만 반환' },
      ],
      correctChoiceId: 'b',
    },
    {
      id: 'q6',
      text: 'v-model의 기본 동작은?',
      choices: [
        { id: 'a', text: '단방향 바인딩' },
        { id: 'b', text: '이벤트 리스닝' },
        { id: 'c', text: '양방향 바인딩' },
        { id: 'd', text: '조건부 렌더링' },
      ],
      correctChoiceId: 'c',
    },
    {
      id: 'q7',
      text: 'watch()와 watchEffect()의 차이점은?',
      choices: [
        { id: 'a', text: 'watch는 소스를 명시, watchEffect는 자동 추적' },
        { id: 'b', text: '동일한 함수의 별칭' },
        { id: 'c', text: 'watchEffect는 동기만 지원' },
        { id: 'd', text: 'watch는 템플릿에서만 사용' },
      ],
      correctChoiceId: 'a',
    },
    {
      id: 'q8',
      text: 'defineEmits()로 정의한 이벤트를 발생시키는 방법은?',
      choices: [
        { id: 'a', text: 'this.$emit()' },
        { id: 'b', text: 'emit() 함수 호출' },
        { id: 'c', text: 'dispatchEvent()' },
        { id: 'd', text: 'trigger()' },
      ],
      correctChoiceId: 'b',
    },
    {
      id: 'q9',
      text: 'provide/inject의 주요 용도는?',
      choices: [
        { id: 'a', text: 'HTTP 요청' },
        { id: 'b', text: '깊은 컴포넌트 트리에서 상태 전달' },
        { id: 'c', text: '라우트 가드' },
        { id: 'd', text: '애니메이션 제어' },
      ],
      correctChoiceId: 'b',
    },
    {
      id: 'q10',
      text: 'Vue 3의 Teleport 컴포넌트가 하는 일은?',
      choices: [
        { id: 'a', text: '페이지 전환 애니메이션' },
        { id: 'b', text: 'DOM의 다른 위치로 콘텐츠를 렌더링' },
        { id: 'c', text: 'API 호출 프록시' },
        { id: 'd', text: '컴포넌트 캐싱' },
      ],
      correctChoiceId: 'b',
    },
  ],
}

export function fetchQuiz(): Promise<Quiz> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(quizData), 300)
  })
}
