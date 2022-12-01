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
function btnShow(btn){
    btn.style.display = 'inline-block';
}

/* 버튼 숨기게 하는 함수 */
function btnBlind(btn){
    btn.style.display = 'none';
}

/* input 입력시
 1.input 창 초기화
2.start 버튼과 reset 버튼 활성화*/
for(i of input){
    i.addEventListener('input',()=>{
        btnStart.disabled = false;
        btnStart.classList.add('on');
        btnReset.classList.add('on');
    })
    i.addEventListener('click',(e)=>{
        e.currentTarget.value='';
    })
}

/* start 버튼 누르면
    1. 입력된 각 input 값 가져오기
    2. start 버튼 숨기고 pause 버튼 활성화 
    3. 입력된 input 값이 음수일 경우 실행 불가 */
btnStart.addEventListener('click', ()=>{
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