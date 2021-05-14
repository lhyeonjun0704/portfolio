//여기부터는 자바스크립트 부분.
// main과 qna를 선언 한뒤, onclick에 넣을 begin함수를 정의해준 뒤,
// animiation.css에서 만들었던 레이아웃을 적용시킬 수 있게 한다.
// 부가적으로 setTimeout을 통해 효과를 더 할 수 있다.
const main = document.querySelector('#main');
const qna = document.querySelector('#qna');
const result = document.querySelector('#result');
const endPoint = 12;
const select = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

function calResult(){

// indexOf는 인덱스 반환, Math.max는 최대값 반환
// ... 는 배열을 펼쳐준다.
  var result = select.indexOf(Math.max(...select));
  return result;
}

function setResult(){
  let point = calResult();
  const resultName = document.querySelector('.resultname');
  resultName.innerHTML = infoList[point].name;

  var resultImg = document.createElement('img');
  const imgDiv = document.querySelector('#resultImg');
  var imgURL = 'img/image-' + point + '.png';
  resultImg.src = imgURL;
  resultImg.alt = point;
  resultImg.classList.add('img-fluid');
  imgDiv.appendChild(resultImg);

  const resultDesc = document.querySelector('.resultDesc');
  resultDesc.innerHTML = infoList[point].desc;
}

function goResult(){
  qna.style.WebkitAnimation = 'fadeOut 1s';
  qna.style.animation = 'fadeOut 1s';
  setTimeout(() => {
    result.style.WebkitAnimation = 'fadeIn 1s';
    result.style.animation = 'fadeIn 1s';
    setTimeout(() => {
         qna.style.display = 'none';
         result.style.display = 'block';
    }, 450)
    let qIdx = 0;
    goNext(qIdx);
  }, 450);
  setResult();
}

// answer는 버튼으로 만든다.
function addAnswer(answerText, qIdx, idx){
  // answerBox를 선택해 와서
  var a = document.querySelector('.answerBox');

  // 내가 만든 변수 createElement로 원하는 형태로 바꿀 수 있다.
  var answer = document.createElement('button');

  // class값이 없는 answer에 answerList라는 클래스 값을 넣어준다.
  answer.classList.add('answerList');
  answer.classList.add('my-3');
  answer.classList.add('py-3');
  answer.classList.add('mx-auto');
  answer.classList.add('fadeIn');

  // answer 변수를 a에 종속 시킨다는 의미이다.
  a.appendChild(answer);
  answer.innerHTML = answerText;

  //addEventListener() = 지정한 이벤트가 대상에 전달 될 때 마다 호출할 함수 설정.
  answer.addEventListener('click', function(){
    var children = document.querySelectorAll('.answerList');
    for(let i = 0; i < children.length; i++){
      children[i].disabled = true;
      children[i].style.WebkitAnimation = 'fadeOut 1s';
      children[i].style.animation = 'fadeOut 0.5s';
    }
    setTimeout(() => {
      var target = qnaList[qIdx].a[idx].type;
      for(let j = 0; j < target.length; j++){
        select[target[j]] += 1;
      }

      for(let i =0; i < children.length; i++){
        children[i].style.display = 'none';
      }
      goNext(++qIdx);
    }, 450);

  }, false);
}

function goNext(qIdx){
  if(qIdx === endPoint){
    goResult();
    return;
  }
  var q = document.querySelector('.qBox');
  q.innerHTML = qnaList[qIdx].q;
  for(let i in qnaList[qIdx].a){
    addAnswer(qnaList[qIdx].a[i].answer, qIdx, i);
  }
  var status = document.querySelector('.statusBar');
  status.style.width = (100 / endPoint) * (qIdx+1) + '%';
}

function begin(){
  main.style.WebkitAnimation = 'fadeOut 1s';
  main.style.animation = 'fadeOut 1s';
  setTimeout(() => {
    qna.style.WebkitAnimation = 'fadeIn 1s';
    qna.style.animation = 'fadeIn 1s';
    setTimeout(() => {
         main.style.display = 'none';
         qna.style.display = 'block';
    }, 450)
    let qIdx = 0;
    goNext(qIdx);
  }, 450);
}
