// variable declaration
const quiz = document.getElementById('game-panel')
const answerEls = document.querySelectorAll('.answer')
const questionEl = document.getElementById('question')
const a_text = document.getElementById('a_text')
const b_text = document.getElementById('b_text')
const c_text = document.getElementById('c_text')
const d_text = document.getElementById('d_text')
let startLevel = JSON.parse(localStorage.getItem('startValue'));
document.querySelector('.level').textContent = startLevel;
let quizQuestions = JSON.parse(localStorage.getItem('quizQuestions'));
const qLength = quizQuestions.length;
let startFrom;
if(startLevel === 1){
  startFrom = 0;
}else if(startLevel === 2){
  startFrom = Math.floor(qLength/3);
}else if(startLevel === 3){
  startFrom = Math.floor(qLength / 3) * 2
}
// initializing and setting value for score
let score = 0;
document.querySelector('.score').textContent = score;

class UI{
  static endGame(txt){
    quiz.innerHTML = `
      <div class="finish-panel my-2 center" style = "width:300px;margin:auto">
      <div class="content center">
        <span class="text-light lead">${txt}...Your Score is <span class="circle">${score}</span></span><br>
        <ul class="my-1">
          <li><a href="../index.html" class="btn quit">Quit Game</a></li>
          <li class="my-2"><a href="./playground.html" class="btn quit">Play Again</a></li>
        </ul>
      </div>
    </div>
    `
  }
  static changesound(src){
    document.querySelector('#myAudio2').setAttribute('src', `${src}`);
  }
  static youWin(){
    document.querySelector('.showImg').setAttribute('src', '../img/correct.gif');
  }
  static youLose(){
    document.querySelector('.showImg').setAttribute('src', '../img/wrong.gif');
  }
  static loadGame(){
    UI.deselectAnswers()
    const currentQuizData = quizQuestions[startFrom]
    questionEl.innerText = currentQuizData.question
    a_text.innerText = currentQuizData.a
    b_text.innerText = currentQuizData.b
    c_text.innerText = currentQuizData.c
    d_text.innerText = currentQuizData.d
  }
  static deselectAnswers() {
    answerEls.forEach(answerEl => answerEl.checked = false)
  }
  static getSelected() {
    let answer
    answerEls.forEach(answerEl => {
        if(answerEl.checked) {
            answer = answerEl.id
        }
    })
    return answer
  }
  static process(){
    if(UI.getSelected() === quizQuestions[startFrom].correct) {
      document.querySelector('.score').textContent = score+=2;
      UI.updateLevel();
      UI.youWin()
      UI.changesound('../audio/correct.mp3')
      setTimeout(() => {
        UI.nextGame()
        UI.changesound('../audio/gamebgsound.mp3');
        document.querySelector('.showImg').setAttribute('src', '../img/gamebg8.jpg');
      }, 4000)
    }else{
      UI.youLose()
      UI.changesound('../audio/wrong.mp3');
      setTimeout(() => {
        UI.changesound('../audio/gamebgsound.mp3');
        document.querySelector('.showImg').setAttribute('src', '../img/gamebg8.jpg');
        UI.changesound('../audio/gamebgsound.mp3');
        UI.endGame('You Lose');
      }, 4000)
    }
  }
  static nextGame(){
    if(startFrom < qLength) {
      UI.loadGame();
    } else {
        UI.endGame('You have successfully completed level 3')
    }
  }
  static updateLevel(){
    startFrom++;
    const OneThird = Math.floor(qLength/3)
    if(startFrom <= OneThird){
      document.querySelector('.level').textContent = 1;
    }else if(startFrom <= ((OneThird)*2)){
      document.querySelector('.level').textContent = 2;
    }else{document.querySelector('.level').textContent = 3;}
  }
}
UI.loadGame()

document.querySelector('.display-box').addEventListener('click', (e) => {
  if(UI.getSelected()){
    document.querySelector('.final-answerbox').style.display = 'block';
  }
  e.preventDefault();
})
document.querySelector('.cancel').addEventListener('click', (e) => {
  document.querySelector('.final-answerbox').style.display = 'none';
  e.preventDefault();
})
document.querySelector('.optionArea').addEventListener('click', (e) => {
  document.querySelector('.final-answerbox').style.display = 'none';
})

document.querySelector('.submit').addEventListener('click', (e) => {
  UI.process()
  document.querySelector('.final-answerbox').style.display = 'none';
  e.preventDefault();
})
