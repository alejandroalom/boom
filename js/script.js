const userInput = document.getElementById("userInput");
const countdownDiv = document.getElementById("countdown");
const resultDiv = document.getElementById("result");
const restartBtn = document.getElementById("restart");

function getRandomNumber() {
  return Math.floor(Math.random() * 3) + 1;
}

function startGame() {
  let countdown = 5;
  countdownDiv.innerText = `Tiempo restante: ${countdown}`;
  resultDiv.innerText = "";

  let userNumber = parseInt(userInput.value);
  if (isNaN(userNumber) || userNumber < 1 || userNumber > 3) {
    resultDiv.innerHTML = "<p class='red'>Introduce un número válido (1-3).</p>";
    return;
  }

  let countdownPromise = new Promise((resolve) => {
    let timer = setInterval(() => {
      countdown--;
      countdownDiv.innerText = `Tiempo restante: ${countdown}`;

      if (countdown === 0) {
        clearInterval(timer);
        resolve();
      }
    }, 1000);
  });

  countdownPromise.then(() => {
    let randomNumber = getRandomNumber();
    checkResult(randomNumber, userNumber);
  });
}

function checkResult(randomNumber, userNumber) {
  return new Promise((resolve) => {
    setTimeout(() => {
      let message;
      if (randomNumber === userNumber) {
        message = `<p class='green'>¡Has salvado el mundo! Número correcto: ${randomNumber}, tu número: ${userNumber}</p>`;
      } else {
        message = `<p class='red'>La bomba ha estallado 💥 Número correcto: ${randomNumber}, tu número: ${userNumber}</p>`;
      }
      resultDiv.innerHTML = message;
      resolve();
    }, 0);
  });
}

userInput.addEventListener("change", startGame);
restartBtn.addEventListener("click", () => location.reload());
