// 내 지도 — 여섯 수업의 최종 소스
//
// 1강 지도 띄우기 · 2강 핀 찍기 · 3강 새로고침해도 남게
// 4강 눌러 보고 지우기 · 5강 가까운 순서로 · 6강 링크로 보내기

const STORAGE_KEY = 'my-map-places';

// 서울 시청. 처음 열었을 때 보여 줄 자리입니다.
const START = { lat: 37.5665, lon: 126.9780 };

let map;
let places = [];      // { id, name, lat, lon }
let markers = [];     // 지도에 올린 마커. places와 같은 순서로 둡니다.
let openInfo = null;  // 지금 열려 있는 말풍선
let origin = null;    // 5강에서 받은 내 위치

// ---------------------------------------------------------------- 3강 저장
function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(places));
}

function load() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    // 저장된 값이 깨졌으면 빈 목록으로 시작합니다. 화면이 아예 안 뜨는 것보다 낫습니다.
    return [];
  }
}

// ---------------------------------------------------------------- 5강 거리
// 지구는 둥글어서 두 숫자를 그냥 빼면 멀어질수록 실제와 어긋납니다.
// 둥근 표면 위의 거리를 구하는 정해진 계산식을 씁니다.
function distanceKm(a, b) {
  const R = 6371.0088;
  const toRad = (deg) => (deg * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lon - a.lon);
  const h =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  return R * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
}

// ---------------------------------------------------------------- 6강 링크
// 한글이 들어가므로 그대로 base64로 바꾸면 깨집니다. 먼저 UTF-8로 바꿔 둡니다.
function encodePlaces(list) {
  const json = JSON.stringify(list);
  const bytes = new TextEncoder().encode(json);
  let binary = '';
  bytes.forEach((b) => { binary += String.fromCharCode(b); });
  return btoa(binary);
}

function decodePlaces(text) {
  const binary = atob(text);
  const bytes = Uint8Array.from(binary, (ch) => ch.charCodeAt(0));
  return JSON.parse(new TextDecoder().decode(bytes));
}

// ---------------------------------------------------------------- 화면 그리기
function clearMarkers() {
  markers.forEach((marker) => marker.setMap(null));
  markers = [];
}

function drawMarkers() {
  clearMarkers();
  places.forEach((place) => {
    const marker = new kakao.maps.Marker({
      map,
      position: new kakao.maps.LatLng(place.lat, place.lon),
    });
    // 4강 마커를 누르면 이름과 지우기 버튼이 뜹니다.
    kakao.maps.event.addListener(marker, 'click', () => showInfo(place, marker));
    markers.push(marker);
  });
}

function showInfo(place, marker) {
  if (openInfo) openInfo.close();
  const content = document.createElement('div');
  content.className = 'bubble';
  const title = document.createElement('strong');
  title.textContent = place.name;
  const remove = document.createElement('button');
  remove.type = 'button';
  remove.textContent = '지우기';
  remove.addEventListener('click', () => removePlace(place.id));
  content.append(title, remove);

  openInfo = new kakao.maps.InfoWindow({ content, removable: true });
  openInfo.open(map, marker);
}

function drawList() {
  const list = document.getElementById('list');
  list.textContent = '';
  places.forEach((place) => {
    const item = document.createElement('li');
    const name = document.createElement('span');
    name.textContent = place.name;
    item.appendChild(name);

    // 5강 내 위치를 받았으면 거리도 함께 보여 줍니다.
    if (origin) {
      const km = document.createElement('em');
      km.textContent = `${distanceKm(origin, place).toFixed(2)}km`;
      item.appendChild(km);
    }

    item.addEventListener('click', () => {
      map.panTo(new kakao.maps.LatLng(place.lat, place.lon));
    });
    list.appendChild(item);
  });
  document.getElementById('count').textContent = String(places.length);
}

function render() {
  drawMarkers();
  drawList();
}

// ---------------------------------------------------------------- 2강 핀 찍기
function addPlace(lat, lon) {
  const name = window.prompt('이곳의 이름을 적어 주세요');
  if (!name) return;                       // 취소하면 아무것도 만들지 않습니다.
  places.push({ id: Date.now(), name, lat, lon });
  save();
  render();
}

// ---------------------------------------------------------------- 4강 지우기
function removePlace(id) {
  places = places.filter((place) => place.id !== id);
  if (openInfo) openInfo.close();
  save();                                   // 화면에서만 지우면 새로고침 때 되살아납니다.
  render();
}

// ---------------------------------------------------------------- 5강 내 위치
function sortByNearby() {
  if (!navigator.geolocation) {
    setHint('이 브라우저는 현재 위치를 알려 주지 않습니다.');
    return;
  }
  navigator.geolocation.getCurrentPosition(
    (position) => {
      origin = { lat: position.coords.latitude, lon: position.coords.longitude };
      new kakao.maps.Marker({
        map,
        position: new kakao.maps.LatLng(origin.lat, origin.lon),
        title: '내 위치',
        zIndex: 10,
      });
      places.sort((a, b) => distanceKm(origin, a) - distanceKm(origin, b));
      save();
      render();
      setHint('가까운 순서로 다시 세웠습니다.');
    },
    () => setHint('위치를 알려 주지 않아 순서를 바꾸지 못했습니다.')
  );
}

function setHint(text) {
  document.getElementById('hint').textContent = text;
}

// ---------------------------------------------------------------- 6강 공유
function makeShareUrl() {
  const base = location.origin + location.pathname;
  const url = `${base}#${encodePlaces(places)}`;
  const box = document.getElementById('shareUrl');
  box.value = url;
  box.select();
  setHint('이 링크를 보내면 친구도 같은 핀을 봅니다.');
}

function readSharedUrl() {
  const hash = location.hash.slice(1);
  if (!hash) return false;
  try {
    const shared = decodePlaces(hash);
    if (!Array.isArray(shared) || shared.length === 0) return false;
    places = shared;
    setHint('친구가 보낸 지도를 열었습니다. 내 지도로 저장하려면 핀을 하나 더 찍어 보세요.');
    return true;
  } catch {
    setHint('링크가 올바르지 않아 내 지도를 그대로 엽니다.');
    return false;
  }
}

// ---------------------------------------------------------------- 1강 시작
function start() {
  map = new kakao.maps.Map(document.getElementById('map'), {
    center: new kakao.maps.LatLng(START.lat, START.lon),
    level: 5,
  });

  // 링크로 들어왔으면 그 목록을, 아니면 저장해 둔 내 목록을 씁니다.
  if (!readSharedUrl()) places = load();

  kakao.maps.event.addListener(map, 'click', (mouseEvent) => {
    const point = mouseEvent.latLng;
    addPlace(point.getLat(), point.getLng());
  });

  document.getElementById('nearby').addEventListener('click', sortByNearby);
  document.getElementById('share').addEventListener('click', makeShareUrl);

  render();
}

kakao.maps.load(start);
