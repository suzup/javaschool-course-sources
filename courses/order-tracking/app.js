// 내 주문 현황판 — 일곱 수업의 최종 소스
//
// 1강 카드 늘어놓기 · 2강 단계 옮기기 · 3강 되돌아가지 않게 · 4강 지나온 자리 남기기
// 5강 단계에 맞는 취소 · 6강 새로고침해도 남게 · 7강 링크로 보내기

const STORAGE_KEY = 'my-orders';

// 2강 쓸 수 있는 단계. 글자로 두면 오타가 그대로 들어갑니다.
const STATUS = {
  PLACED: '주문함',
  PREPARING: '준비 중',
  IN_TRANSIT: '오는 중',
  DELIVERED: '받음',
  CANCEL_REQUESTED: '취소 요청함',
  CANCELLED: '취소됨',
};

// 진행 바에 순서대로 보여 줄 네 단계
const TRACK = ['PLACED', 'PREPARING', 'IN_TRANSIT', 'DELIVERED'];

// 3강 지금 단계에서 갈 수 있는 다음 단계
const NEXT = {
  PLACED: ['PREPARING', 'CANCELLED'],
  PREPARING: ['IN_TRANSIT', 'CANCELLED'],
  IN_TRANSIT: ['DELIVERED', 'CANCEL_REQUESTED'],
  CANCEL_REQUESTED: ['CANCELLED', 'DELIVERED'],  // 못 세워서 그대로 오는 일이 있습니다
  DELIVERED: [],                                  // 받은 것은 되돌리지 않습니다
  CANCELLED: [],
};

let orders = [];  // { id, title, place, status, events: [{ status, at }] }

// ---------------------------------------------------------------- 6강 저장
function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
}

function load() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

// ---------------------------------------------------------------- 2강·3강·4강
function canGo(from, to) {
  return NEXT[from].includes(to);
}

// 지금 단계는 덮어쓰고, 지나온 자리는 덧붙입니다. 하는 일이 다릅니다.
function moveTo(order, next, at = Date.now()) {
  if (!canGo(order.status, next)) return false;
  order.status = next;
  order.events.push({ status: next, at });
  return true;
}

// ---------------------------------------------------------------- 5강 취소
// 지금 단계를 보고 결과를 갈라 처리합니다.
function cancel(order, at = Date.now()) {
  if (order.status === 'PLACED' || order.status === 'PREPARING') {
    return moveTo(order, 'CANCELLED', at) ? 'CANCELLED' : null;
  }
  if (order.status === 'IN_TRANSIT') {
    return moveTo(order, 'CANCEL_REQUESTED', at) ? 'CANCEL_REQUESTED' : null;
  }
  return null;   // 이미 끝난 주문은 취소할 자리가 없습니다
}

// ---------------------------------------------------------------- 7강 링크
function encodeOrders(list) {
  const bytes = new TextEncoder().encode(JSON.stringify(list));
  let binary = '';
  bytes.forEach((b) => { binary += String.fromCharCode(b); });
  return btoa(binary);
}

function decodeOrders(text) {
  const binary = atob(text);
  const bytes = Uint8Array.from(binary, (ch) => ch.charCodeAt(0));
  return JSON.parse(new TextDecoder().decode(bytes));
}

// ---------------------------------------------------------------- 화면
function timeText(at) {
  const date = new Date(at);
  const two = (value) => String(value).padStart(2, '0');
  return `${two(date.getMonth() + 1)}/${two(date.getDate())} ${two(date.getHours())}:${two(date.getMinutes())}`;
}

function cardOf(order) {
  const card = document.createElement('article');
  card.className = 'card';
  if (order.status === 'DELIVERED') card.classList.add('card--done');
  if (order.status === 'CANCELLED') card.classList.add('card--cancelled');

  const head = document.createElement('div');
  head.className = 'card__head';
  const title = document.createElement('h2');
  title.textContent = order.title;
  const where = document.createElement('span');
  where.className = 'card__where';
  where.textContent = order.place || '';
  head.append(title, where);

  // 진행 바. 취소된 주문은 붉게 둡니다.
  const bar = document.createElement('div');
  bar.className = 'bar';
  const reached = TRACK.indexOf(order.status);
  TRACK.forEach((step, index) => {
    const cell = document.createElement('span');
    if (order.status === 'CANCELLED' || order.status === 'CANCEL_REQUESTED') {
      if (index === 0) cell.className = 'cancel';
    } else if (index <= reached) {
      cell.className = 'on';
    }
    bar.appendChild(cell);
  });

  const now = document.createElement('p');
  now.className = 'card__now';
  now.textContent = STATUS[order.status];

  const actions = document.createElement('div');
  actions.className = 'card__actions';
  NEXT[order.status]
    .filter((next) => next !== 'CANCELLED' && next !== 'CANCEL_REQUESTED')
    .forEach((next) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = `${STATUS[next]}(으)로`;
      button.addEventListener('click', () => {
        moveTo(order, next);
        save();
        render();
      });
      actions.appendChild(button);
    });

  const cancelButton = document.createElement('button');
  cancelButton.type = 'button';
  cancelButton.textContent = '취소';
  cancelButton.disabled = cancel({ ...order, events: [] }) === null;
  cancelButton.addEventListener('click', () => {
    const result = cancel(order);
    save();
    render();
    setHint(result === 'CANCEL_REQUESTED'
      ? '이미 오는 중이라 취소 요청으로 두었습니다. 그대로 도착할 수도 있습니다.'
      : '취소했습니다.');
  });
  actions.appendChild(cancelButton);

  const timeline = document.createElement('ul');
  timeline.className = 'timeline';
  order.events.forEach((event) => {
    const item = document.createElement('li');
    item.textContent = `${timeText(event.at)} · ${STATUS[event.status]}`;
    timeline.appendChild(item);
  });

  card.append(head, bar, now, actions, timeline);
  return card;
}

function render() {
  const list = document.getElementById('list');
  list.textContent = '';
  orders.slice().sort((a, b) => b.id - a.id).forEach((order) => list.appendChild(cardOf(order)));
}

function setHint(text) {
  document.getElementById('hint').textContent = text;
}

// ---------------------------------------------------------------- 시작
function start() {
  if (!readSharedUrl()) orders = load();

  document.getElementById('form').addEventListener('submit', (event) => {
    event.preventDefault();
    const title = document.getElementById('title').value.trim();
    if (!title) return;
    const at = Date.now();
    orders.push({
      id: at,
      title,
      place: document.getElementById('place').value.trim(),
      status: 'PLACED',
      events: [{ status: 'PLACED', at }],
    });
    save();
    event.target.reset();
    render();
  });

  document.getElementById('share').addEventListener('click', () => {
    const url = `${location.origin}${location.pathname}#${encodeOrders(orders)}`;
    const box = document.getElementById('shareUrl');
    box.value = url;
    box.select();
    setHint('이 링크를 보내면 같이 시킨 사람도 현황판을 봅니다.');
  });

  render();
}

function readSharedUrl() {
  const hash = location.hash.slice(1);
  if (!hash) return false;
  try {
    orders = decodeOrders(hash);
    setHint('친구가 보낸 현황판을 열었습니다.');
    return true;
  } catch {
    return false;
  }
}

start();
