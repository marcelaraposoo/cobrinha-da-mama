const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const box = 20;
let snake = [{ x: 160, y: 240 }];
let direction = "RIGHT";
let food = gerarComida();
let pontos = 0;
let game;
let morreu = false;

// Sons
const somComida = new Audio("colisao.mp3");
const somGameOver = new Audio("perdeu.mp3");

// Movimento da cobrinha
document.addEventListener("keydown", (event) => {
  if (event.key === "a" && direction !== "RIGHT") direction = "LEFT";
  if (event.key === "d" && direction !== "LEFT") direction = "RIGHT";
  if (event.key === "w" && direction !== "DOWN") direction = "UP";
  if (event.key === "s" && direction !== "UP") direction = "DOWN";
});

function gerarComida() {
  return {
    x: Math.floor(Math.random() * (canvas.width / box)) * box,
    y: Math.floor(Math.random() * (canvas.height / box)) * box
  };
}

function draw() {
  if (morreu) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Desenha a cobra
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = "#800080"; // roxo mama
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  // Desenha a comida
  ctx.fillStyle = "lime";
  ctx.fillRect(food.x, food.y, box, box);

  // Movimento
  let head = { ...snake[0] };
  if (direction === "RIGHT") head.x += box;
  if (direction === "LEFT") head.x -= box;
  if (direction === "UP") head.y -= box;
  if (direction === "DOWN") head.y += box;

  // Colisão com bordas
  if (
    head.x < 0 ||
    head.x >= canvas.width ||
    head.y < 0 ||
    head.y >= canvas.height ||
    snake.some((segment) => segment.x === head.x && segment.y === head.y)
  ) {
    somGameOver.play();
    morreu = true;
    document.getElementById("gameover").classList.remove("oculto");
    clearInterval(game);
    return;
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    pontos++;
    document.getElementById("pontuacao").innerText = `Pontos: ${pontos}`;
    food = gerarComida();
    somComida.play();
  } else {
    snake.pop();
  }
}

function reiniciarJogo() {
  snake = [{ x: 160, y: 240 }];
  direction = "RIGHT";
  food = gerarComida();
  pontos = 0;
  morreu = false;
  document.getElementById("pontuacao").innerText = `Pontos: 0`;
  document.getElementById("gameover").classList.add("oculto");
  game = setInterval(draw, 100);
}

// Começa o jogo
reiniciarJogo();
