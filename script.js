const body = document.body;
const stage = document.getElementById('stage');
const doors = Array.from(document.querySelectorAll('.door'));
const veil = document.getElementById('entry-veil');
const roomLayer = document.getElementById('room-layer');
const backBtn = document.getElementById('back-to-gallery');
const roomTitle = document.getElementById('room-title');
const roomLine = document.getElementById('room-line');
const roomPoem = document.getElementById('room-poem');
const roomAuthor = document.getElementById('room-author');
const roomNotes = document.getElementById('room-notes');
let activeDoor = null;

const lines = [
  "여백은 문을 닫지 않아도 고요를 품는다",
  "어둠은 안쪽에서 빛을 잘 보여주기 위한 액자였다",
  "세모난 숨들이 겹쳐 문을 눕히고, 다시 세운다",
  "틈은 잊혀진 손바닥처럼 온기를 남겨둔다",
  "벽이 아니라 바람이 문을 생각하게 한다",
  "낡은 경첩 하나로 세계가 움직인다",
  "문턱을 넘는 순간 마음의 기압이 달라진다",
  "치유는 닫히는 속도로 새살의 숨을 눌러준다",
  "방랑은 회전문을 돌며 방향을 잃는 연습이다",
  "꿈은 닫힌 문을 들어 올려 다른 밤에 걸어둔다",
  "비는 문을 두드리지 않고도 냄새를 바꾼다"
];

const rooms = {
  lonely: {
    title: "작은 틈으로 들어가는 밤",
    line: "밤을 여는 가장 가벼운 방법은 작은 틈에 숨을 고이는 일",
    poem: "창문이 아니라 틈이었다\n숨을 놓아둘 수 있는 곳은\n닫혀 있는 것 같으면서 열린 부분\n나는 그곳으로 몸을 기울이고\n밤의 방을 천천히 통과한다\n\n문지방을 넘어서는 소리는\n발끝에서 나는 것이 아니라\n목을 지나가는 숨에서 시작된다",
    author: "한로, 2024",
    notes: "틈이라는 모티프를 따라 세로 리듬을 강조했습니다. 얇은 밝기 차이로 문틀의 깊이를 남겨두어, 관람객이 천천히 숨을 고르게 만드는 방입니다."
  },
  love: {
    title: "문지방 위에 오래 머무는 발",
    line: "사랑은 문지방에 오래 머무르는 발걸음처럼 다정했다",
    poem: "문을 열고 들어오지 않아도\n그대가 머물던 체온은\n문지방 위에서 오래 남는다\n\n머뭇거림의 길이만큼\n방 안의 공기가 달아올라\n나는 그 길이를 재며 웃었다",
    author: "서담, 2023",
    notes: "아치형 문 형태로 부드러운 상승감을 주었습니다. 파란 잉크 톤의 캡션과 둥근 코너가 방의 다정을 강조합니다."
  },
  anxiety: {
    title: "두드리기 전의 떨림",
    line: "불안은 두드리는 손끝보다도 먼저 마음속에서 문을 열어젖힌다",
    poem: "노크 소리는 아직 울리지 않았는데\n손끝의 떨림이 먼저 안쪽을 깨웠다\n\n방 안의 공기는 얇은 유리처럼\n깨지기 쉬운 투명함으로 흔들렸고\n나는 문틈으로 빠져나가는 빛을\n손바닥으로 힘껏 붙잡았다",
    author: "장해, 2022",
    notes: "균열과 각을 살린 라인으로 긴장감을 배치했습니다. 캡션 여백을 넓게 두어 숨이 지나갈 공간을 확보했습니다."
  },
  memory: {
    title: "겹겹이 닫히는 빛",
    line: "기억은 겹겹이 닫히며도 안쪽에서 작게 울리는 빛을 남긴다",
    poem: "겹겹의 문을 닫으며 돌아서도\n안쪽에서는 미세한 울림이 남는다\n\n빛은 먼지처럼 가볍게 떠올라\n시간의 두께를 따라앉는다\n\n나는 그 두께에 귀를 대고\n사라진 목소리의 온도를 잰다",
    author: "이안, 2021",
    notes: "이중문 구조를 겹친 SVG로 표현할 예정인 방. 지금은 외곽만 노출하지만 텍스트 좌우 여백을 두텁게 잡아 아카이브 느낌을 살렸습니다."
  },
  calm: {
    title: "느린 숨의 방",
    line: "고요는 열림과 닫힘 사이 느린 숨으로 문을 굳힌다",
    poem: "문은 천천히 닫히고\n그 사이로 숨이 지나간다\n\n느린 호흡은 경첩을 부드럽게 적시고\n방의 공기는 깊어졌다\n\n나는 그 안에서 오래 서 있어도\n시간이 두꺼워지지 않는다는 것을 안다",
    author: "문지, 2020",
    notes: "직선과 곡선의 균형을 맞춘 문틀. 저채도의 조명을 깔아 정적이지만 단단한 공간감을 줍니다."
  },
  anger: {
    title: "문설주의 잔열",
    line: "분노는 문설주를 흔들며 지나가도 결국 닫힌 틈에 남는 열기",
    poem: "문은 크게 흔들렸지만\n남은 것은 틈새의 열기뿐\n\n나는 그 열기에 손을 얹어본다\n뜨겁지만 사라지지 않는다\n\n벽에 기대어 숨을 고르면\n분노의 모양이 천천히 식어간다",
    author: "류진, 2022",
    notes: "각진 문 형태에 붉은 포인트를 더해 긴장감을 주었습니다. 방에서는 어두운 바닥과 좁은 캡션으로 뜨거운 공기를 가두듯 연출합니다."
  },
  healing: {
    title: "기름종이 같은 문",
    line: "치유는 천천히 닫히며 새살을 눌러주는 얇은 문틀에서 시작된다",
    poem: "거즈처럼 얇은 문틀에\n새살이 닿았다\n문은 아프지 않으려 천천히 닫혔고\n나는 그 느린 속도를 따라\n숨을 낮췄다\n\n미세한 틈으로 약한 빛이 스며\n상처의 경계를 부드럽게 감았다\n안쪽에서 나는 금방 나을 것 같았다",
    author: "윤해, 2024",
    notes: "반투명한 레이어를 겹쳐 기름종이 질감을 상상했습니다. 포근한 미색과 낮은 대비로 눈을 쉬게 만들고, 문틀 라인을 부드럽게 눌러 치유의 속도를 느리게 했습니다."
  },
  wander: {
    title: "떠돌이의 회전문",
    line: "방랑은 문을 통과하는 순간마다 방향을 잃어버리는 기술",
    poem: "나는 같은 문을 돌며 나왔다\n나왔으나 다른 방향을 보았다\n바닥의 화살표는 모두 둥글게 말려 있었고\n바람은 나를 밀지도 당기지도 않았다\n\n문을 한 바퀴 돌 때마다\n손바닥에 다른 온도가 묻었다\n그 온도로 나는 다음 길을 짐작했다",
    author: "계율, 2019",
    notes: "사선으로 기울어진 문틀에 곡선 하중을 줘서 회전문의 어지러움을 담았습니다. 금속성 포인트와 반사광을 더해 도시적 방랑의 감각을 강화합니다."
  },
  dream: {
    title: "잠의 경첩",
    line: "꿈은 닫힌 문을 통째로 들어 올려 다른 집에 걸어둔다",
    poem: "잠이 오면 경첩이 툭 풀린다\n문은 소리 없이 공중에 걸리고\n나는 그 아래로 미끄러져 들어간다\n\n새벽의 방에서\n문틀이 보랏빛 숨을 뿜는다\n다시 깨어 돌아올 때\n문은 아무 일 없었다는 듯 제자리에 서 있다",
    author: "노묘, 2021",
    notes: "상단을 둥글게 열어 둔 구조로 부유감을 더했습니다. 보랏빛 음영과 부드러운 그라데이션으로 꿈틀거리는 공기의 흐름을 표현합니다."
  },
  rain: {
    title: "빗물로 열리는 문",
    line: "비는 문을 두드리지 않고도 방을 촉촉히 여는 언어",
    poem: "문고리를 잡지 않아도\n빗방울이 먼저 손금 위에 눕는다\n문틀을 타고 흘러내린 물길이\n방 안의 먼 냄새를 깨운다\n\n문이 스스로 숨을 들이마시는 소리\n그때 나는 비의 문법을 듣는다\n닫혀 있던 마음이 젖으며 열린다",
    author: "도현, 2023",
    notes: "세로로 긴 비수형 문틀을 써서 물길이 흘러내리는 이미지를 살렸습니다. 청록과 짙은 회색 대비로 젖은 목재 질감을 떠올리게 합니다."
  }
};

function placeDoors() {
  doors.forEach((door, idx) => {
    const rotation = 0;
    door.style.transform = `rotate(${rotation}deg)`;
    door.dataset.rotation = rotation;
    door.dataset.tx = 0;
    door.dataset.ty = 0;
    door.dataset.initialTransform = door.style.transform;

    const textPath = door.querySelector('textPath');
    const pathId = door.dataset.path;
    const path = document.getElementById(pathId);
    const pathLength = path ? path.getTotalLength() : 800;
    const repeats = Math.max(8, Math.ceil(pathLength / 18)); // keep 문 간격을 유지하며 전체를 채우기
    const borderText = "문 ".repeat(repeats).trim();
    textPath.textContent = borderText;
    textPath.setAttribute('startOffset', "0%");
    textPath.setAttribute('lengthAdjust', 'spacingAndGlyphs');
    textPath.setAttribute('textLength', `${pathLength}`);

    const poemBox = door.querySelector('.poem');
    const chosenLine = door.dataset.text || lines[idx % lines.length];
    poemBox.textContent = chosenLine;
  });
}

placeDoors();

function fillRoom(data) {
  roomTitle.textContent = data.title;
  roomLine.textContent = data.line;
  roomPoem.textContent = data.poem;
  roomAuthor.textContent = data.author;
  roomNotes.textContent = data.notes;
}

function centerDoor(door) {
  const rect = door.getBoundingClientRect();
  const targetX = (window.innerWidth - rect.width) / 2;
  const targetY = (window.innerHeight - rect.height) / 2;
  const rotation = door.dataset.rotation || 0;
  door.style.transition = 'transform 0.9s ease, filter 0.6s ease, opacity 0.6s ease';
  door.style.transform = `translate(${targetX}px, ${targetY}px) rotate(${rotation}deg) scale(1.05)`;
}

function resetDoor(door) {
  const base = door.dataset.initialTransform || 'none';
  door.style.transform = base;
  door.classList.remove('active');
}

function openRoom(door) {
  const key = door.dataset.room;
  const data = rooms[key];
  if (!data || body.classList.contains('in-room') || body.classList.contains('entering')) return;

  activeDoor = door;
  body.classList.add('entering');
  door.classList.add('active');
  centerDoor(door);
  veil.classList.add('visible');

  setTimeout(() => {
    fillRoom(data);
    roomLayer.classList.add('visible');
    document.body.classList.remove('entering');
    document.body.classList.add('in-room');
  }, 500);
}

function closeRoom() {
  if (!activeDoor) return;
  roomLayer.classList.remove('visible');
  veil.classList.remove('visible');
  document.body.classList.remove('in-room');
  document.body.classList.remove('entering');
  resetDoor(activeDoor);
  activeDoor = null;
}

doors.forEach(door => {
  door.addEventListener('dblclick', (e) => {
    e.preventDefault();
    openRoom(door);
  });
});

backBtn.addEventListener('click', closeRoom);
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeRoom();
  }
});
veil.addEventListener('click', closeRoom);
