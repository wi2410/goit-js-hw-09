const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.querySelector('body');

stopBtn.setAttribute('disabled', true)


function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onChangeBodyBackground() {
  body.style.backgroundColor = getRandomHexColor();
}

const colorSwitcher = {
  intervalId: null,

  start() {
    
    this.isActive = true;
    startBtn.setAttribute('disabled', true)
    stopBtn.removeAttribute('disabled')

    this.intervalId = setInterval(() => {
      onChangeBodyBackground();
    }, 1000);
  },

  stop() {
    clearInterval(this.intervalId);
    startBtn.removeAttribute('disabled')
    stopBtn.setAttribute('disabled', true)
  }

}

startBtn.addEventListener('click', () => { colorSwitcher.start() });
stopBtn.addEventListener('click', () => { colorSwitcher.stop() });