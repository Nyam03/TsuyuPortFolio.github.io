const track = document.querySelector(".gallery-track");
const images = document.querySelectorAll(".gallery-track img");
const totalImages = images.length;
let index = 1; 
let slideInterval;

// 갤러리 너비 계산 및 위치 초기화
function initGallery() {
  const width = document.querySelector(".gallery").clientWidth;
  track.style.transition = 'none';
  track.style.transform = `translateX(${-width * index}px)`;
}

// 슬라이드 이동 실행
function update() {
  const width = document.querySelector(".gallery").clientWidth;
  track.style.transition = "transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
  track.style.transform = `translateX(${-width * index}px)`;
}

// 무한 루프 처리를 위한 transitionend 이벤트
track.addEventListener('transitionend', () => {
  if (images[index].classList.contains('clone')) {
    track.style.transition = 'none';
    if (index === 0) index = totalImages - 2;
    if (index === totalImages - 1) index = 1;
    const width = document.querySelector(".gallery").clientWidth;
    track.style.transform = `translateX(${-width * index}px)`;
  }
});

function nextSlide() {
  if (index >= totalImages - 1) return;
  index++;
  update();
}

function prevSlide() {
  if (index <= 0) return;
  index--;
  update();
}

// 자동 슬라이드 타이머
function startTimer() { 
  slideInterval = setInterval(nextSlide, 5000); 
}

function resetTimer() { 
  clearInterval(slideInterval); 
  startTimer(); 
}

// 이벤트 리스너 등록
document.getElementById("next").addEventListener('click', () => { 
  nextSlide(); 
  resetTimer(); 
});

document.getElementById("prev").addEventListener('click', () => { 
  prevSlide(); 
  resetTimer(); 
});

// 이미지 우클릭 방지
document.addEventListener('contextmenu', (e) => {
  if (e.target.tagName === 'IMG') e.preventDefault();
}, false);

// 초기 실행
window.onload = () => {
  initGallery();
  startTimer();
};

// 브라우저 크기 변경 시 대응
window.onresize = initGallery;