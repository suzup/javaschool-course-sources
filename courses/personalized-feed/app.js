// 내 피드 — 여섯 수업의 최종 소스
//
// 1강 글 뿌리기 · 2강 겹치지 않게 이어 받기 · 3강 하트 남기기
// 4강 내 관심 주제가 위로 · 5강 왜 위에 있는지 배지 · 6강 링크로 보내기

const STORAGE_KEY = 'my-feed-reactions';
const PAGE_SIZE = 5;

let reactions = {};   // { 글번호: { like: true, save: true } }
let cursor = null;    // 2강 마지막으로 본 자리
let shown = [];       // 지금 화면에 붙어 있는 글

// ---------------------------------------------------------------- 3강 저장
function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reactions));
}

function load() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

// ---------------------------------------------------------------- 4강 점수
// 내가 하트를 누른 글의 주제마다 몇 번 눌렀는지 셉니다.
function interestByTopic() {
  const counts = {};
  Object.entries(reactions).forEach(([id, mark]) => {
    if (!mark.like) return;
    const post = POSTS.find((item) => item.id === Number(id));
    if (!post) return;
    counts[post.topic] = (counts[post.topic] || 0) + 1;
  });
  return counts;
}

// 점수는 세 가지를 더해 만듭니다.
//   최근성  나중에 올라온 글일수록 큽니다. 새 글이 묻히지 않게 합니다.
//   반응    전체 반응이 많을수록 큽니다. 아무도 안 본 글이 위로 오지 않게 합니다.
//   관심    내가 하트를 누른 주제면 큽니다. 이 값이 순서를 내 것으로 만듭니다.
function scoreOf(post, interest) {
  const recent = post.minute;
  const popular = post.likes * 2;
  const mine = (interest[post.topic] || 0) * 150;
  return { total: recent + popular + mine, recent, popular, mine };
}

// 5강 배지: 가장 크게 기여한 항목 하나만 붙입니다. 둘 다 붙이면 무엇을 보여 줄지 다시 정해야 합니다.
function reasonOf(score) {
  if (score.mine > 0) return 'interest';
  return 'popular';
}

function rankedPosts() {
  const interest = interestByTopic();
  return POSTS
    .map((post) => ({ post, score: scoreOf(post, interest) }))
    .sort((a, b) => b.score.total - a.score.total || b.post.minute - a.post.minute);
}

// ---------------------------------------------------------------- 2강 이어 받기
// 몇 번째부터 몇 개로 세지 않습니다. 마지막으로 본 글의 점수와 번호를 기준으로 그 뒤부터 받습니다.
function nextPage(ranked, from) {
  const rest = from === null
    ? ranked
    : ranked.filter((entry) =>
      entry.score.total < from.total ||
      (entry.score.total === from.total && entry.post.id < from.id));
  const page = rest.slice(0, PAGE_SIZE);
  const last = page[page.length - 1];
  return {
    page,
    next: last ? { total: last.score.total, id: last.post.id } : null,
  };
}

// ---------------------------------------------------------------- 6강 링크
function encodeReactions(value) {
  const bytes = new TextEncoder().encode(JSON.stringify(value));
  let binary = '';
  bytes.forEach((b) => { binary += String.fromCharCode(b); });
  return btoa(binary);
}

function decodeReactions(text) {
  const binary = atob(text);
  const bytes = Uint8Array.from(binary, (ch) => ch.charCodeAt(0));
  return JSON.parse(new TextDecoder().decode(bytes));
}

// ---------------------------------------------------------------- 화면
function cardOf(entry) {
  const { post, score } = entry;
  const card = document.createElement('article');
  card.className = 'card';

  const head = document.createElement('div');
  head.className = 'card__head';
  const title = document.createElement('h2');
  title.textContent = post.title;
  const badge = document.createElement('span');
  const reason = reasonOf(score);
  badge.className = `badge badge--${reason}`;
  badge.textContent = reason === 'interest' ? '관심 주제' : '인기';
  head.append(title, badge);

  const meta = document.createElement('p');
  meta.className = 'card__meta';
  meta.textContent = `${post.topic} · 반응 ${post.likes}`;

  const actions = document.createElement('div');
  actions.className = 'card__actions';
  actions.append(markButton(post, 'like', '하트'), markButton(post, 'save', '저장'));

  card.append(head, meta, actions);
  return card;
}

function markButton(post, kind, label) {
  const mark = reactions[post.id] || {};
  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = label;
  button.setAttribute('aria-pressed', String(Boolean(mark[kind])));
  button.addEventListener('click', () => {
    const now = reactions[post.id] || {};
    reactions[post.id] = { ...now, [kind]: !now[kind] };
    save();
    if (kind === 'like') {
      restart();
      setHint('하트를 반영해 순서를 다시 세웠습니다.');
    } else {
      button.setAttribute('aria-pressed', String(Boolean(reactions[post.id][kind])));
    }
  });
  return button;
}

function appendPage() {
  const ranked = rankedPosts();
  const { page, next } = nextPage(ranked, cursor);
  const feed = document.getElementById('feed');
  page.forEach((entry) => {
    shown.push(entry.post.id);
    feed.appendChild(cardOf(entry));
  });
  cursor = next;
  const finished = page.length < PAGE_SIZE || next === null;
  document.getElementById('more').hidden = finished;
  document.getElementById('done').hidden = !finished;
}

function restart() {
  document.getElementById('feed').textContent = '';
  cursor = null;
  shown = [];
  appendPage();
}

function setHint(text) {
  document.getElementById('hint').textContent = text;
}

// ---------------------------------------------------------------- 6강 공유
function makeShareUrl() {
  const url = `${location.origin}${location.pathname}#${encodeReactions(reactions)}`;
  const box = document.getElementById('shareUrl');
  box.value = url;
  box.select();
  setHint('이 링크를 보내면 친구도 내 순서로 봅니다.');
}

function readSharedUrl() {
  const hash = location.hash.slice(1);
  if (!hash) return false;
  try {
    reactions = decodeReactions(hash);
    setHint('친구가 보낸 피드를 열었습니다. 하트를 누르면 내 순서로 바뀝니다.');
    return true;
  } catch {
    return false;
  }
}

function start() {
  if (!readSharedUrl()) reactions = load();
  document.getElementById('more').addEventListener('click', appendPage);
  document.getElementById('share').addEventListener('click', makeShareUrl);
  appendPage();
}

start();
