const track = document.querySelector(".gallery-track");
const images = document.querySelectorAll(".gallery-track img");
const profileImg = document.querySelector(".profile-img");
const totalImages = images.length;

let index = 1; 
let slideInterval;

const clickSound = new Audio('sound/1.mp3');

// 1. 프로필 이미지 터치 이벤트
profileImg.addEventListener('click', () => {
  if (clickSound.paused) {
    clickSound.play();
    profileImg.classList.add('shake');
  }
});

profileImg.addEventListener('animationend', () => {
  profileImg.classList.remove('shake');
});


// 2. 갤러리 로직
function initGallery() {
  const width = document.querySelector(".gallery").clientWidth;
  track.style.transition = 'none';
  track.style.transform = `translateX(${-width * index}px)`;
}

function update() {
  const width = document.querySelector(".gallery").clientWidth;
  track.style.transition = "transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
  track.style.transform = `translateX(${-width * index}px)`;
}

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

// 3. 타이머 및 컨트롤
function startTimer() { 
  slideInterval = setInterval(nextSlide, 5000); 
}

function resetTimer() { 
  clearInterval(slideInterval); 
  startTimer(); 
}

document.getElementById("next").addEventListener('click', () => { 
  nextSlide(); 
  resetTimer(); 
});

document.getElementById("prev").addEventListener('click', () => { 
  prevSlide(); 
  resetTimer(); 
});

// 4. 보안 및 초기화
document.addEventListener('contextmenu', (e) => {
  if (e.target.tagName === 'IMG') e.preventDefault();
}, false);

window.onload = () => {
  initGallery();
  startTimer();
};

window.onresize = initGallery;