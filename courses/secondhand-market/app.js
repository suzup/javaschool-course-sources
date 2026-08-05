// 내가 파는 물건 — 일곱 수업의 최종 소스
//
// 1강 카드 보이기 · 2강 사진 붙이기 · 3강 사진 아닌 파일 막기 · 4강 새로고침해도 남게
// 5강 갈래와 값으로 찾기 · 6강 판매 단계 나누기 · 7강 링크로 보내기

const STORAGE_KEY = 'my-market-items';

// 3강 검사 기준. 왜 이 값인지는 원고에서 설명합니다.
const MAX_BYTES = 5 * 1024 * 1024;
const MIN_SIDE = 100;

// 4강에서 사진을 함께 저장하려고 줄이는 크기입니다.
// 브라우저 저장소는 대략 5MB뿐이라 원본 사진 몇 장이면 꽉 찹니다.
const THUMB_SIDE = 400;

// 6강 쓸 수 있는 단계와 갈 수 있는 다음 단계
const STATUS = { ACTIVE: '판매 중', RESERVED: '예약 중', SOLD: '판매 완료' };
const NEXT_STATUS = {
  ACTIVE: ['RESERVED', 'SOLD'],
  RESERVED: ['ACTIVE', 'SOLD'],   // 약속이 깨지면 판매 중으로 돌아갑니다
  SOLD: [],                        // 끝난 거래는 되돌리지 않습니다
};

let items = [];   // { id, title, price, category, status, photo }
let pickedPhoto = null;

// ---------------------------------------------------------------- 4강 저장
function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
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

// ---------------------------------------------------------------- 3강 사진 검사
// 파일 종류와 크기를 저장 전에 봅니다. 통과하지 못하면 등록하지 않습니다.
function photoError(file, width, height) {
  if (!file.type.startsWith('image/')) return '사진 파일만 올릴 수 있습니다.';
  if (file.size > MAX_BYTES) return '사진이 너무 큽니다. 5MB 아래로 올려 주세요.';
  if (width < MIN_SIDE || height < MIN_SIDE) return '너무 작은 사진입니다.';
  return null;
}

// 2강 고른 파일을 화면에 보여 주고, 4강을 위해 줄여 둡니다.
function readPhoto(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('사진을 읽지 못했습니다.'));
    reader.onload = () => {
      const image = new Image();
      image.onerror = () => reject(new Error('사진을 읽지 못했습니다.'));
      image.onload = () => {
        const message = photoError(file, image.width, image.height);
        if (message) {
          reject(new Error(message));
          return;
        }
        resolve(shrink(image));
      };
      image.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

function shrink(image) {
  const scale = Math.min(1, THUMB_SIDE / Math.max(image.width, image.height));
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(image.width * scale);
  canvas.height = Math.round(image.height * scale);
  canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL('image/jpeg', 0.8);
}

// ---------------------------------------------------------------- 5강 찾기
// 조건을 한 줄에 몰아넣지 않습니다. 한 줄이 한 가지만 봐야 나중에 고칠 때 찾기 쉽습니다.
function search(list, filter) {
  return list
    .filter((item) => filter.showSold || item.status !== 'SOLD')
    .filter((item) => !filter.category || item.category === filter.category)
    .filter((item) => filter.min === null || item.price >= filter.min)
    .filter((item) => filter.max === null || item.price <= filter.max)
    .sort((a, b) => b.id - a.id);          // 방금 올린 것이 앞에 옵니다
}

// ---------------------------------------------------------------- 6강 단계
function changeStatus(id, next) {
  const item = items.find((one) => one.id === id);
  if (!item) return;
  if (!NEXT_STATUS[item.status].includes(next)) {
    setHint(`${STATUS[item.status]}에서 ${STATUS[next]}로는 바꿀 수 없습니다.`);
    return;
  }
  item.status = next;
  save();
  render();
}

// ---------------------------------------------------------------- 7강 링크
// 사진은 담지 않습니다. 주소에 넣기에 너무 큽니다.
function encodeItems(list) {
  const light = list.map(({ photo, ...rest }) => rest);
  const bytes = new TextEncoder().encode(JSON.stringify(light));
  let binary = '';
  bytes.forEach((b) => { binary += String.fromCharCode(b); });
  return btoa(binary);
}

function decodeItems(text) {
  const binary = atob(text);
  const bytes = Uint8Array.from(binary, (ch) => ch.charCodeAt(0));
  return JSON.parse(new TextDecoder().decode(bytes));
}

// ---------------------------------------------------------------- 화면
function currentFilter() {
  const number = (id) => {
    const value = document.getElementById(id).value;
    return value === '' ? null : Number(value);
  };
  return {
    category: document.getElementById('filterCategory').value,
    min: number('minPrice'),
    max: number('maxPrice'),
    showSold: document.getElementById('showSold').checked,
  };
}

function cardOf(item) {
  const card = document.createElement('article');
  card.className = `card${item.status === 'SOLD' ? ' card--sold' : ''}`;

  if (item.photo) {
    const photo = document.createElement('img');
    photo.className = 'card__photo';
    photo.src = item.photo;
    photo.alt = item.title;
    card.appendChild(photo);
  } else {
    const empty = document.createElement('div');
    empty.className = 'card__photo card__photo--empty';
    empty.textContent = '사진 없음';
    card.appendChild(empty);
  }

  const body = document.createElement('div');
  body.className = 'card__body';
  const title = document.createElement('h3');
  title.textContent = item.title;
  const price = document.createElement('p');
  price.className = 'card__price';
  price.textContent = `${item.price.toLocaleString()}원`;
  const meta = document.createElement('p');
  meta.className = 'card__meta';
  meta.textContent = `${item.category} · ${STATUS[item.status]}`;

  const actions = document.createElement('div');
  actions.className = 'card__actions';
  NEXT_STATUS[item.status].forEach((next) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = STATUS[next];
    button.addEventListener('click', () => changeStatus(item.id, next));
    actions.appendChild(button);
  });

  body.append(title, price, meta, actions);
  card.appendChild(body);
  return card;
}

function render() {
  const grid = document.getElementById('grid');
  grid.textContent = '';
  search(items, currentFilter()).forEach((item) => grid.appendChild(cardOf(item)));
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
  if (!readSharedUrl()) items = load();

  document.getElementById('photo').addEventListener('change', async (event) => {
    const file = event.target.files[0];
    showError('');
    pickedPhoto = null;
    const preview = document.getElementById('preview');
    preview.hidden = true;
    if (!file) return;
    try {
      pickedPhoto = await readPhoto(file);
      preview.src = pickedPhoto;
      preview.hidden = false;
    } catch (error) {
      showError(error.message);
      event.target.value = '';
    }
  });

  document.getElementById('form').addEventListener('submit', (event) => {
    event.preventDefault();
    const title = document.getElementById('title').value.trim();
    const price = Number(document.getElementById('price').value);
    if (!title || Number.isNaN(price)) return;
    items.push({
      id: Date.now(),
      title,
      price,
      category: document.getElementById('category').value,
      status: 'ACTIVE',
      photo: pickedPhoto,
    });
    save();
    event.target.reset();
    document.getElementById('preview').hidden = true;
    pickedPhoto = null;
    render();
    setHint('물건을 올렸습니다.');
  });

  ['filterCategory', 'minPrice', 'maxPrice', 'showSold'].forEach((id) => {
    document.getElementById(id).addEventListener('input', render);
  });

  document.getElementById('share').addEventListener('click', () => {
    const url = `${location.origin}${location.pathname}#${encodeItems(items)}`;
    const box = document.getElementById('shareUrl');
    box.value = url;
    box.select();
    setHint('링크를 보냈습니다. 사진은 담기지 않습니다.');
  });

  render();
}

function readSharedUrl() {
  const hash = location.hash.slice(1);
  if (!hash) return false;
  try {
    items = decodeItems(hash).map((item) => ({ ...item, photo: null }));
    setHint('친구가 보낸 목록입니다. 사진은 올린 사람 화면에만 있습니다.');
    return true;
  } catch {
    return false;
  }
}

start();
