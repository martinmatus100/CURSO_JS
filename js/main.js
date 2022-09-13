/// VARIABLES
let numGames = 0;
let gameResult = []; // ARRAY DE OBJETOS

/// BUTTONS
let btnStartGame = document.getElementById("btn_StartGame");
let btnTheme = document.getElementById("switchDarkMode");

/// INPUTS
let txtNumGames = document.getElementById("txt_numGames");

/// ELEMENTS
let instContainer = document.getElementById("boxInstructions");
let gameContainer = document.getElementById("boxGames");

/// SET THEME
setTheme();

/// CHECK numGames is Odd
btnStartGame.addEventListener("click", getNumGames);
txtNumGames.onkeydown = () => {
  if (event.key === "Enter") {
    getNumGames();
  }
};

/// FUNCTIONS
function getFinalResult(array) {
  let gamesWon = array.filter((el) => el.result == "GANASTE");
  let gamesLost = array.filter((el) => el.result == "PERDISTE");
  /// 1- OPERADOR TERNARIO
  let finalResult = (gamesWon.length > gamesLost.length) ? true : false; 
  return finalResult;
}

function setFinalResults(arrayResult) {
  let container = document.getElementById("alertResults");
  let alertResultItem = document.createElement("div");
  alertResultItem.classList.add("alert");
  alertResultItem.setAttribute("role", "alert");
  let auxText,
    auxTitle = "";

  if (getFinalResult(arrayResult)) {
    alertResultItem.classList.add("alert-success");
    auxTitle = "FELICITACIONES!";
    auxText = "Ganaste el juego de Piedras, Papel o Tijeras :)";
  } else {
    alertResultItem.classList.add("alert-danger");
    auxTitle = "MALA SUERTE!";
    auxText = "Perdiste el juego de Piedras, Papel o Tijeras :(";
  }

  alertResultItem.innerHTML =
    '<h4 class="alert-heading">' +
    auxTitle +
    "</h4>" +
    "<p>" +
    auxText +
    "</p>";
  container.appendChild(alertResultItem);
  document.getElementById("btnResetGame").style.display = "block";
}

function getNumGames() {
  let container = document.getElementById("alertOddNum");
  let alertOddNumItem = document.createElement("div");

  if (isOdd(txtNumGames.value)) {
    container.style.display = "none";
    instContainer.style.display = "none";
    gameContainer.style.display = "block";
    numGames = txtNumGames.value;
    startGame(numGames);
    playGame();
  } else {
    alertOddNumItem.classList.add("alert", "alert-danger");
    alertOddNumItem.setAttribute("role", "alert");
    alertOddNumItem.innerHTML = "Por favor ingrese un número IMPAR para jugar!";
    container.style.display = "block";
    container.appendChild(alertOddNumItem);
    txtNumGames.focus();
  }
}

function isOdd(val) {
  if (val % 2 == 0) {
    return false;
  } else {
    return true;
  }
}

function startGame(num) {
  for (let i = 1; i <= num; i++) {
    let cardGameItem = document.createElement("div");
    cardGameItem.classList.add(
      "card",
      "text-bg-warning",
      "mb-3",
      "text-center",
      "card-disabled"
    );
    cardGameItem.setAttribute("id", "card_" + i);
    /// OPERADOR LÓGICO AND
    (i == 1) && cardGameItem.classList.remove("card-disabled");

    cardGameItem.innerHTML =
      '<div class="card-header">Partida ' +
      i +
      "</div>" +
      '<div class="card-body"><div class="card-game">' +
      '<div class="card-player"><h5 class="card-title">Seleccione una opción</h5><div class="btn-group" role="group">' +
      '<button id="btnPiedra_' +
      i +
      '" data-iter="' +
      i +
      '" data-val="1" type="button" class="btn btn-dark btn-player"><i class="fa-solid fa-hand-back-fist --piedra"></i><span>Piedra</span></button>' +
      '<button id="btnPapel_' +
      i +
      '" data-iter="' +
      i +
      '" data-val="2" type="button" class="btn btn-dark btn-player"><i class="fa-solid fa-hand --papel"></i><span>Papel</span></button>' +
      '<button id="btnTijera_' +
      i +
      '" data-iter="' +
      i +
      '" data-val="3" type="button" class="btn btn-dark btn-player"><i class="fa-solid fa-hand-scissors --tijera"></i><span>Tijera</span></button>' +
      "</div></div>" +
      '<div class="card-ia"><h5 class="card-title">Maquina sacó</h5><div id="btnIaGroup_' +
      i +
      '" class="btn-group" role="group"></div></div>' +
      '<div class="card-result"><h5 class="card-title">Resultado Parcial</h5><div id="btnResultGroup_' +
      i +
      '" class="btn-group" role="group"></div></div>' +
      "</div></div>";

    gameContainer.appendChild(cardGameItem);
  }
}

function playGame() {
  var auxIter,
    auxVal = 0;
  var moveIA;
  var auxResult;
  const btnsPlayer = document.querySelectorAll(".btn-player");

  for (let i = 0; i < btnsPlayer.length; i++) {
    btnsPlayer[i].addEventListener("click", function (e) {
      auxIter = e.currentTarget.getAttribute("data-iter");
      auxVal = e.currentTarget.getAttribute("data-val");
      /// MOVE IA
      moveIA = randomMove(auxVal);
      /// SET IA MOVE
      setIaMove(moveIA, auxIter);
      /// GET & SET RESULT
      auxResult = getResult(auxVal, moveIA);
      setResults(auxResult, auxIter);
      enableGames(auxIter);
      /// SE CARGA EL ARRAY CON EL OBJETO
      gameResult.push({
        player: moveToText(auxVal),
        ia: moveToText(moveIA),
        result: auxResult,
      });

      if (auxIter == numGames) {
        setFinalResults(gameResult);
      }
    });
  }
}

function setIaMove(move, iter) {
  let optIa = "";
  let btnIaGroup = document.getElementById("btnIaGroup_" + iter);
  let btnIaItem = document.createElement("button");
  btnIaItem.classList.add("btn", "btn-secondary");
  btnIaItem.setAttribute("type", "button");

  switch (move) {
    case 1:
      optIa =
        '<i class="fa-solid fa-hand-back-fist --piedra"></i><span>Piedra</span>';
      break;

    case 2:
      optIa = '<i class="fa-solid fa-hand --papel"></i><span>Papel</span>';
      break;

    case 3:
      optIa =
        '<i class="fa-solid fa-hand-scissors --tijera"></i><span>Tijera</span>';
      break;
  }

  btnIaItem.innerHTML = optIa;
  btnIaGroup.appendChild(btnIaItem);
}

function randomMove(movePlayer) {
  const min = 1;
  const max = 3;
  let random = 0;

  do {
    random = Math.floor(Math.random() * (max - min + 1) + min);
  } while (random == movePlayer);
  return random;
}

function getResult(move1, move2) {
  const rock = "Piedra";
  const paper = "Papel";
  const scissors = "Tijera";
  const draw = "EMPATE";
  const win = "GANASTE";
  const lose = "PERDISTE";

  let valMovePlayer = moveToText(move1);
  let valMoveIA = moveToText(move2);

  if (valMovePlayer === valMoveIA) {
    return draw;
  }

  if (valMovePlayer === rock && valMoveIA === paper) {
    return lose;
  }

  if (valMovePlayer === rock && valMoveIA === scissors) {
    return win;
  }

  if (valMovePlayer === paper && valMoveIA === rock) {
    return win;
  }

  if (valMovePlayer === paper && valMoveIA === scissors) {
    return lose;
  }

  if (valMovePlayer === scissors && valMoveIA === rock) {
    return lose;
  }

  if (valMovePlayer === scissors && valMoveIA === paper) {
    return win;
  }
}

function moveToText(move) {
  switch (move) {
    case "1":
      return "Piedra";
      break;

    case "2":
      return "Papel";
      break;

    case "3":
      return "Tijera";
      break;

    case 1:
      return "Piedra";
      break;

    case 2:
      return "Papel";
      break;

    case 3:
      return "Tijera";
      break;
  }
}

function setResults(result, iter) {
  let optResult = "";
  let btnResultGroup = document.getElementById("btnResultGroup_" + iter);
  let btnResultItem = document.createElement("button");
  btnResultItem.classList.add("btn");
  btnResultItem.setAttribute("type", "button");

  switch (result) {
    case "GANASTE":
      optResult =
        '<i class="fa-solid fa-thumbs-up"></i><span>' + result + "</span>";
      btnResultItem.classList.add("btn-success");
      break;

    case "PERDISTE":
      optResult =
        '<i class="fa-solid fa-thumbs-down"></i><span>' + result + "</span>";
      btnResultItem.classList.add("btn-danger");
      break;
  }

  btnResultItem.innerHTML = optResult;
  btnResultGroup.appendChild(btnResultItem);
}

function enableGames(currentIter) {
  let iter = parseInt(currentIter, 10);
  let maxIter = parseInt(numGames, 10);
  let nextIter = iter + 1;

  if (iter >= 1) {
    let currentCard = document.getElementById("card_" + iter);
    let nextCard = document.getElementById("card_" + nextIter);
    currentCard.classList.add("card-disabled");
    if (iter < maxIter) {
      nextCard.classList.remove("card-disabled");
    }
  }
}

btnTheme.addEventListener("click", changeTheme);

function changeTheme() {
  let isChecked;

  /** SET LOCALSTORAGE */
  let themeObject = {
    dark: 'on',
  };
  localStorage.setItem('theme', JSON.stringify(themeObject));
  /** GET LOCALSTORAGE */
  let localThemeObject = localStorage.getItem("theme");
  let jsonTheme = JSON.parse(localThemeObject);

  isChecked = document.getElementById("switchDarkMode").checked;

  if (isChecked) {
    // DARK MODE
    document.body.classList.remove("light-theme");
    jsonTheme["dark"] = "on";
  } else {
    // LIGHT MODE
    document.body.classList.add("light-theme");
    jsonTheme["dark"] = "off";
  }

  localStorage.setItem('theme', JSON.stringify(jsonTheme));
}

function setTheme() {
  let localThemeObject = localStorage.getItem("theme");
  jsonTheme = localThemeObject ? JSON.parse(localThemeObject) : {};

  if (jsonTheme["dark"] == "on") {
    document.getElementById("switchDarkMode").checked = true;
    // DARK MODE
    document.body.classList.remove("light-theme");
  } else {
    document.getElementById("switchDarkMode").checked = false;
    // LIGHT MODE
    document.body.classList.add("light-theme");
  }
}
