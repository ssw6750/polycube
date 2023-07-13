// 페이지 구성 확인
document.addEventListener("DOMContentLoaded", function () {
  console.log("페이지가 구성되었습니다.");

  // 배너 생성
  init();
});

// 리소스 로드 확인
window.addEventListener("load", function () {
  console.log("모든 리소스가 로드되었습니다.");
});

// 배너 생성
function init() {
  // 이미지 URL 배열
  const imageUrls = [
    "https://placekitten.com/400/100?image=1",
    "https://placekitten.com/400/100?image=2",
    "https://placekitten.com/400/100?image=3",
  ];

  const sliderContainer = document.getElementById("slider-container");
  let currentIndex = 0;
  let timer;

  // 다음 슬라이드로 이동하는 함수
  function goToNextSlide() {
    currentIndex = (currentIndex + 1) % imageUrls.length;
    showSlide();
  }

  // 이전 슬라이드로 이동하는 함수
  function goToPrevSlide() {
    currentIndex = (currentIndex - 1 + imageUrls.length) % imageUrls.length;
    showSlide();
  }

  // 슬라이드 보여주는 함수
  function showSlide() {
    sliderContainer.innerHTML = "";

    // fetch를 사용한 이미지 가져오기
    fetch(imageUrls[currentIndex])
      .then((response) => response.blob())
      .then((blob) => {
        const img = document.createElement("img");
        img.src = URL.createObjectURL(blob);
        sliderContainer.appendChild(img);
      });
  }

  // 배너 자동 변경 타이머
  function startTimer() {
    timer = setInterval(goToNextSlide, 3000);
  }

  // 타이머 종료
  function stopTimer() {
    clearInterval(timer);
  }

  // 사용자 터치 동작 처리
  function handleSwipe(e) {
    const touch = e.changedTouches[0];
    const startX = touch.pageX;

    function handleTouchMove(e) {
      e.preventDefault();
    }

    function handleTouchEnd(e) {
      const touch = e.changedTouches[0];
      const diffX = touch.pageX - startX;
      if (diffX < 0) {
          goToNextSlide();
      } else if (diffX > 0) {
        goToPrevSlide();
      }

      // 이벤트 해지
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);

      // 자동 배너 실행
      startTimer();
    }

    // 터치가 발생하면 자동 배너 중지
    stopTimer();

    // 이벤트 등록 (passive: false)를 통한 기본 동작 제한
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", handleTouchEnd);
  }

  // 슬라이드 배너 초기화
  showSlide();
  startTimer();

  // 터치 이벤트 등록
  sliderContainer.addEventListener("touchstart", handleSwipe);
}
