//돋보기 버튼 제어
const searchEl = document.querySelector('.search');
const searchInputEl = searchEl.querySelector('input'); //.search 안의 input태그까지 접근

searchEl.addEventListener('click', function () {
    searchInputEl.focus();
});

//포커스가 들어가면 .focused 추가해서 돋보기 아이콘 사라지게 만들기
searchInputEl.addEventListener('focus', function () {
    //포커스가 들어가면 'focused'(class)가 추가됨
    searchEl.classList.add('focused');
    //setAttribute => 속성을 추가할 때 사용
    searchInputEl.setAttribute('placeholder', ' 통합검색');
});

//포커스가 나가면 .focused 삭제
searchInputEl.addEventListener('blur', function () {
    //포커스가 나가면 'focused'(class)가 삭제됨
    searchEl.classList.remove('focused');
    searchInputEl.setAttribute('placeholder', '');
});


// ---------------------뱃지 제어---------------------
const badgeEl = document.querySelector('header .badges');
const toTopEl = document.querySelector("#to-top");
/*
document => html자체로 해석/ html태그 안에있는 DOM(요소)를 가리킬때
window => 브라우저 창으로 해석/ 브라우저 창을 기준으로 함
*/
/*
lodash설치 후
_.throttle(함수, 시간)
lodash 기능-> 사이트가 무거워지는 것을 방지해줌
*/
window.addEventListener('scroll',
    _.throttle(function () {
        if (window.scrollY > 500) {
            //스크롤이 500보다 크면 - > 뱃지가 안보이도록
            // badgeEl.style.display = 'none'

            //gsap문법 -> gsap.to(요소, 지속시간 초단위, 옵션)
            gsap.to(badgeEl, 0.6, {
                opacity: 0,
                display: 'none'
            });

            //상단으로 스크롤 버튼 보이기!
            gsap.to(toTopEl, 0.2, {
                x: 0,
            });
        } else {
            // badgeEl.style.display = 'block'
            gsap.to(badgeEl, 0.6, {
                opacity: 1,
                display: 'block'
            });
            //상단으로 스크롤 버튼 숨기기!
            gsap.to(toTopEl, 0.2, {
                x: 100,
            });
        }
    }, 300)
    //0.3초 있다가 실행됨 -> lodash 기능으로 사이트가 무거워지는 걸 방지
);

//상단으로 스크롤 버튼을 클릭하면,
toTopEl.addEventListener('click', function () {
    // 페이지 위치를 최상단으로 부드럽게(0.7초 동안) 이동.
    gsap.to(window, .7, {
        scrollTo: 0
    });
});

// ---------------------main visual 순차적 등장---------------------
const fadeEl = document.querySelectorAll('.visual .fade-in');
fadeEl.forEach(function (fadeEl, index) {
    //gsap문법 -> gsap.to(요소, 지속시간 초단위, 옵션)
    gsap.to(fadeEl, 1, {
        delay: (index + 1) * 0.7, //0.7초 후에 등장
        //1.4, 2.1, 2.8초 배열에 각각 딜레이 줘서 순차적으로 등장하게 함
        opacity: 1,
    })
})

// ---------------------공지사항 swiper slider---------------------
const swiper = new Swiper('.notice-line .swiper', {
    // Optional parameters
    direction: 'vertical',
    loop: true,
    autoplay: true, //자동재생
});



// ---------------------promotion swiper slider---------------------
new Swiper('.promotion .swiper', {
    direction: 'horizontal',
    loop: true,
    autoplay: {
        delay: 5000
        //자동으로 넘어가는 것을 지연시킴 (천천히 넘어가게 함)
    },
    pagination: {
        //pager
        el: ".promotion .swiper-pagination",
        clickable: true //페이저 클릭해서 제어 가능 여부
    },
    navigation: {
        prevEl: ".promotion .swiper-prev",
        nextEl: ".promotion .swiper-next"
    },
    slidesPerView: 3, //한 번에 보여줄 슬라이드 개수
    spaceBetween: 10, //슬라이드 사이 여백
    centeredSlides: true //첫번째로 나오는 1번 슬라이드가 가운데에 보이기

});

//---------------------promotion toggle-btn---------------------
const promotionEl = document.querySelector('.promotion'); //슬라이드 영역 요소 검색
const promotionToggleBtn = document.querySelector('.toggle-promotion'); //슬라이드 영역을 토글(펼쳐줄) 할 버튼 검색

//슬라이드 영역 숨김 여부에 관한 기본값 설정
let isHidePromotion = false;

//토글버튼 클릭하면
promotionToggleBtn.addEventListener('click', function () {
    //슬라이드 영역 숨김 여부를 반대값 -> !사용
    isHidePromotion = !isHidePromotion; //부정연산자 ! 사용으로 원래값 flase=> true로 변경 됨

    //isHidePromotionr 값이 true면
    if (isHidePromotion) {
        promotionEl.classList.add('hide');
        //promotionEl('.promotion')에 class값 .hide를 추가시킴
    } else {
        promotionEl.classList.remove('hide');
        //promotionEl('.promotion')에 class값 .hide를 삭제시킴
    }
});

//---------------------플로팅 이미지---------------------
function random(min, max) {
    //toFixed
    return parseFloat((Math.random() * (max - min) + min).toFixed(2));
}

function floatingObject(selector, delay, size) {
    //gsap문법 -> gsap.to(요소, 지속시간 초단위, 옵션)
    //----------------지속시간 -> 랜덤(최소, 최대)
    gsap.to(selector, random(1.5, 2.5), {
        y: size, //y축 값
        repeat: -1, //몇 번 반복할지 설정, -1은 무한반복
        yoyo: true, //한 번 재생된 애니메이션을 다시 뒤로 재생
        ease: Power1.easeOut, //https://greensock.com/docs/v2/Easing 사이트에서 easing 효과 골라서 넣음
        delay: random(0, delay),
    })
}

floatingObject('.floating1', 1, 15)
floatingObject('.floating2', 0.5, 15)
floatingObject('.floating3', 1.5, 15)

//---------------------AWARDS---------------------
new Swiper('.awards .swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    autoplay: true, //자동재생
    slidesPerView: 5, //한 번에 보여줄 슬라이드 개수
    spaceBetween: 30, //슬라이드 사이 여백
    navigation: {
        prevEl: ".awards .swiper-prev",
        nextEl: ".awards .swiper-next"
    },
});


//올해 년도 구하기---------------------
const thisYear = document.querySelector('.this-year');
thisYear.textContent = new Date().getFullYear(); //내장객체 가져오기

//Masgic Scroll---------------------
const spyEls = document.querySelectorAll("section.scroll-spy");
//forEach -> 배열함수
spyEls.forEach(function (spyEl) {
    new ScrollMagic.Scene({
            triggerElement: spyEl, //보여질 부분 감지할 요소 지정
            triggerHook: 0.8, //0.8초 동안 훅이 실행됨
        })
        //토글 할 요소 생성 및 제거
        //.setClassToggle(토글 할 요소, "넣었다 뺐다 할 class 이름 생성")
        .setClassToggle(spyEl, "show")
        .addTo(new ScrollMagic.Controller());
});