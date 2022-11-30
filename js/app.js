
class UI {
  static loading(msg){
    document.querySelector('#level').innerHTML = `
    <img src="../img/loading.gif">
    <p class="lead p-1 text-light center">${msg}</p>
    `
  }
  static changesound(){
    document.querySelector('#myAudio2').setAttribute('src', '../audio/startsound.mp3')
  }
  static loadGame(){
    setTimeout(function(){
      window.location.replace('playground.html')
    }, 5000);
  }
  static saveValue(startValue){
    localStorage.setItem('startValue', JSON.stringify(startValue));
  }
  static saveQuestion(){
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'questions.json', true);
    xhr.onload = function(){
      if(this.status === 200) {
        const quizQuestions = JSON.parse(this.responseText);
        localStorage.setItem('quizQuestions', JSON.stringify(quizQuestions));
      }
    }
    xhr.send();
  }
}
UI.saveQuestion()
document.querySelector('.level-one').addEventListener('click', (e) => {
  UI.loading('Well, a good place to begin, you can work your way up to higher level, lets get started')
  UI.loadGame()
  UI.saveValue(1)
  UI.changesound()
})
document.querySelector('.level-two').addEventListener('click', (e) => {
  UI.loading('Wow! are you sure you are up to the task, this is not so friendly but Alright lets get started!')
  UI.loadGame()
  UI.saveValue(2)
  UI.changesound()
})
document.querySelector('.level-three').addEventListener('click', (e) => {
  UI.loading('Wooo! this is a mind blowing level, Alright lets get started!')
  UI.loadGame()
  UI.saveValue(3)
  UI.changesound()
})
