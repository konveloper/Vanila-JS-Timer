const main = document.querySelector('#app');
const input = document.querySelectorAll('input')
const inpHrs = document.querySelector('#hrs');
const inpMin = document.querySelector('#min');
const inpSec = document.querySelector('#sec');

const btnStart = document.querySelector('.btn-start')
const btnPause = document.querySelector('.btn-pause')
const btnReset = document.querySelector('.btn-reset')

let interval

/* 버튼 보이게 하는 함수 */
function btnShow(btn) {
    btn.style.display = 'inline-block';
}

/* 버튼 숨기게 하는 함수 */
function btnBlind(btn) {
    btn.style.display = 'none';
}

/* input 입력시
 1.input 창 초기화
2.start 버튼과 reset 버튼 활성화*/
for (i of input) {
    i.addEventListener('input', () => {
        btnStart.disabled = false;
        btnStart.classList.add('on');
        btnReset.classList.add('on');
    })
    i.addEventListener('click', (e) => {
        e.currentTarget.value = '';
    })
}

/* start 버튼 누르면
    1. 입력된 각 input 값 가져오기
    2. start 버튼 숨기고 pause 버튼 활성화 
    3. 입력된 input 값이 음수일 경우 실행 불가 */
btnStart.addEventListener('click', () => {
    const hrs = parseInt(inpHrs.value);
    const min = parseInt(inpMin.value);
    const sec = parseInt(inpSec.value);
    const totalSec = hrs * 60 * 60 + min * 60 + sec;
    if (totalSec < 0) {
        alert('정확한 시간을 써주세요!');
        return;
    }
    startTimer(totalSec);
    btnBlind(btnStart);
    btnShow(btnPause);
})

/* 타이머 시작하면 
 1.타이머 1초씩 감소하고 0일 때 정지
 2.start 버튼 비활성화 */
function startTimer(totalSec) {
    interval = setInterval(() => {

        if (totalSec <= 0) {
            interval = clearInterval(interval);
            alert('finish!');
            btnStart.disabled = true;
            btnStart.classList.remove('on');
            btnReset.classList.remove('on');
            btnShow(btnStart);
            btnBlind(btnPause);
        }
        totalSec--;
        updateInputs(totalSec);
    }, 1000)
}

/* 총 시간 시, 분, 초로 나누기 */
function updateInputs(totalSec) {
    const hrs = Math.floor(totalSec / 60 / 60);
    const min = Math.floor(totalSec / 60);
    const sec = totalSec % 60;

    inpHrs.value = hrs;
    inpMin.value = min;
    inpSec.value = sec;

    if (hrs < 10) {
        inpHrs.value = '0' + hrs
    }
    if (min < 10) {
        inpMin.value = '0' + min
    }
    if (sec < 10) {
        inpSec.value = '0' + sec
    }
}
