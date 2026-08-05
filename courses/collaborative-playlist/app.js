// 같이 듣는 목록 — 여섯 수업의 최종 소스
//
// 1강 곡 보이기 · 2강 썸네일 띄우기 · 3강 같은 곡 막기
// 4강 순서 바꾸기 · 5강 새로고침해도 남게 · 6강 친구에게 보내고 받기

const STORAGE_KEY = 'our-playlist';

let tracks = [];      // { videoId, title }
let dragFrom = null;

// ---------------------------------------------------------------- 2강 영상 번호
// YouTube 주소는 모양이 여러 가지입니다. 어느 쪽이든 영상 번호만 뽑아냅니다.
//   https://www.youtube.com/watch?v=abc12345678
//   https://youtu.be/abc12345678
//   https://www.youtube.com/shorts/abc12345678
function videoIdOf(link) {
  const patterns = [
    /[?&]v=([A-Za-z0-9_-]{11})/,
    /youtu\.be\/([A-Za-z0-9_-]{11})/,
    /\/shorts\/([A-Za-z0-9_-]{11})/,
    /\/embed\/([A-Za-z0-9_-]{11})/,
  ];
  for (const pattern of patterns) {
    const found = link.match(pattern);
    if (found) return found[1];
  }
  return null;
}

// 썸네일은 이 주소로 바로 뜹니다. 키도 계정도 필요 없습니다.
function thumbOf(videoId) {
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

// ---------------------------------------------------------------- 3강 같은 곡
// 제목으로 가르면 띄어쓰기 하나만 달라도 다른 곡이 됩니다. 영상 번호로 가릅니다.
function hasTrack(list, videoId) {
  return list.some((track) => track.videoId === videoId);
}

function addTrack(list, videoId, title) {
  if (hasTrack(list, videoId)) return { added: false, list };
  return { added: true, list: [...list, { videoId, title }] };
}

// ---------------------------------------------------------------- 4강 순서
// 뺀 뒤에 넣습니다. 빼기 전 길이로 자리를 계산하면 마지막 자리가 어긋납니다.
function move(list, from, to) {
  if (from === to || from < 0 || from >= list.length) return list;
  const next = list.slice();
  const [picked] = next.splice(from, 1);
  const target = Math.max(0, Math.min(to, next.length));
  next.splice(target, 0, picked);
  return next;
}

// ---------------------------------------------------------------- 5강 저장
function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tracks));
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

// ---------------------------------------------------------------- 6강 주고받기
function encodeTracks(list) {
  const bytes = new TextEncoder().encode(JSON.stringify(list));
  let binary = '';
  bytes.forEach((b) => { binary += String.fromCharCode(b); });
  return btoa(binary);
}

function decodeTracks(text) {
  const binary = atob(text);
  const bytes = Uint8Array.from(binary, (ch) => ch.charCodeAt(0));
  return JSON.parse(new TextDecoder().decode(bytes));
}

// 받은 쪽 순서를 유지하고 새 곡만 뒤에 붙입니다. 겹치는 곡은 3강 규칙으로 한 번만 남깁니다.
function mergeTracks(mine, theirs) {
  const merged = mine.slice();
  theirs.forEach((track) => {
    if (!hasTrack(merged, track.videoId)) merged.push(track);
  });
  return merged;
}

// ---------------------------------------------------------------- 화면
function trackOf(track, index) {
  const row = document.createElement('article');
  row.className = 'track';
  row.draggable = true;
  row.dataset.index = String(index);

  const no = document.createElement('span');
  no.className = 'track__no';
  no.textContent = String(index + 1);

  const thumb = document.createElement('img');
  thumb.className = 'track__thumb';
  thumb.src = thumbOf(track.videoId);
  thumb.alt = track.title;

  const title = document.createElement('p');
  title.className = 'track__title';
  title.textContent = track.title;

  const remove = document.createElement('button');
  remove.type = 'button';
  remove.className = 'track__remove';
  remove.textContent = '빼기';
  remove.addEventListener('click', () => {
    tracks = tracks.filter((one) => one.videoId !== track.videoId);
    save();
    render();
  });

  row.addEventListener('dragstart', () => {
    dragFrom = index;
    row.classList.add('dragging');
  });
  row.addEventListener('dragend', () => row.classList.remove('dragging'));
  row.addEventListener('dragover', (event) => event.preventDefault());
  row.addEventListener('drop', (event) => {
    event.preventDefault();
    if (dragFrom === null) return;
    tracks = move(tracks, dragFrom, index);
    dragFrom = null;
    save();
    render();
  });

  row.append(no, thumb, title, remove);
  return row;
}

function render() {
  const box = document.getElementById('tracks');
  box.textContent = '';
  tracks.forEach((track, index) => box.appendChild(trackOf(track, index)));
}

function setHint(text) {
  document.getElementById('hint').textContent = text;
}

function showError(text) {
  const box = document.getElementById('error');
  box.textContent = text;
  box.hidden = !text;
}

// ---------------------------------------------------------------- 시작
function start() {
  const shared = readSharedUrl();
  const mine = load();
  if (shared) {
    tracks = mergeTracks(mine, shared);
    save();
    setHint(`친구 목록에서 새 곡 ${tracks.length - mine.length}개를 더했습니다.`);
  } else {
    tracks = mine;
  }

  document.getElementById('form').addEventListener('submit', (event) => {
    event.preventDefault();
    showError('');
    const link = document.getElementById('link').value.trim();
    const title = document.getElementById('title').value.trim();
    const videoId = videoIdOf(link);
    if (!videoId) {
      showError('YouTube 링크가 아닙니다. 주소를 다시 확인해 주세요.');
      return;
    }
    const result = addTrack(tracks, videoId, title);
    if (!result.added) {
      showError('이미 목록에 있는 곡입니다.');
      return;
    }
    tracks = result.list;
    save();
    event.target.reset();
    render();
    setHint('곡을 넣었습니다. 끌어서 순서를 바꿀 수 있습니다.');
  });

  document.getElementById('share').addEventListener('click', () => {
    const url = `${location.origin}${location.pathname}#${encodeTracks(tracks)}`;
    const box = document.getElementById('shareUrl');
    box.value = url;
    box.select();
    setHint('이 링크를 친구에게 보내세요. 친구가 곡을 더해 다시 보내 줍니다.');
  });

  render();
}

function readSharedUrl() {
  const hash = location.hash.slice(1);
  if (!hash) return null;
  try {
    const list = decodeTracks(hash);
    return Array.isArray(list) ? list : null;
  } catch {
    return null;
  }
}

start();
