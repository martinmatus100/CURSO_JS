/// VARIABLES
let numGames = 0;
let gameResultOld = [];
let gameResult = []; // ARRAY DE OBJETOS

/// CICLOS
//WHILE
do {
  numGames = prompt("Ingrese la cantidad de partidas a jugar (numero impar)");
} while (!isOdd(numGames));

//FOR
for (let i = 1; i <= numGames; i++) {
  // JUGADA JUGADOR
  movePlayer = prompt("Ingrese Piedra [1], Papel [2] ó Tijera [3]: ");

  // JUGADA MAQUINA
  moveIA = randomMove();

  //RESULTADOS PARCIALES
  // console.log('Partida ' + i + ': Jugador sacó [' + moveToText(movePlayer) + '] vs Maquina sacó [' + moveToText(moveIA) + ']');
  // console.log('Resultado: ' + getResult(movePlayer, moveIA) + '!');

  let container = document.getElementById('listResults');
  let resultItem = document.createElement('li');
  resultItem.classList.add('list-group-item', 'd-flex', 'justify-content-between' ,'align-items-center','list-group-item-info');
  resultItem.innerHTML =  '<span class="badge bg-info rounded-pill">' + i + '</span>' + 
                          'JUGADOR sacó: ' + moveToText(movePlayer) + ' vs MAQUINA sacó: ' + moveToText(moveIA) + ' - RESULTADO: ' + getResult(movePlayer, moveIA);
  container.appendChild(resultItem);

  if (getResult(movePlayer, moveIA) == "EMPATE") {
    i--;
  } else {
    gameResultOld.push(getResult(movePlayer, moveIA));
    
    /// SE CARGA EL ARRAY CON EL OBJETO
    gameResult.push({ player: moveToText(movePlayer), ia: moveToText(moveIA), result: getResult(movePlayer, moveIA)});
  }
  
}

/// IMPRIME ARRAY DE OBJETOS Y RESULTADOS
// console.log(gameResult);
// console.log(getFinalResult(gameResult));

setFinalResults(gameResult);

/// FUNCIONES
function isOdd(val) {
  if (val % 2 == 0) {
    return false;
  } else {
    return true;
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

function randomMove() {
  const min = 1;
  const max = 3;
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getResult(move1, move2) {
    const rock = "Piedra";
    const paper = "Papel";
    const scissors = "Tijera";
    const draw = "EMPATE";
    const win = "GANASTE";
    const lose = "PERDISTE"

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

function getFinalResult_Old(result) {
  let auxWin = 0;
  let auxLose = 0;

  for (let i = 0; i <= result.length; i++) {
    if (result[i] == "GANASTE") {
      auxWin++;
    }

    if (result[i] == "PERDISTE") {
      auxLose++;
    }
  }

  if(auxWin > auxLose) {
    return "FELICITACIONES! GANASTE EL JUEGO"; 
  } else {
    return "MALA SUERTE! PERDISTE EL JUEGO";
  }
}

function getFinalResult(array) {
  let gamesWon = array.filter((el) => el.result == "GANASTE");
  let gamesLost = array.filter((el) => el.result == "PERDISTE");

  if(gamesWon.length > gamesLost.length) {
    //return "FELICITACIONES! GANASTE EL JUEGO"; 
    return true;
  } else {
    //return "MALA SUERTE! PERDISTE EL JUEGO";
    return false;
  }
}

function setFinalResults(arrayResult) {
  let container = document.getElementById('alertResults');
  let alertResultItem = document.createElement('div');
  alertResultItem.classList.add('alert');
  alertResultItem.setAttribute('role', 'alert');
  let auxText, auxTitle = "";

  if(getFinalResult(arrayResult)) {
    alertResultItem.classList.add('alert-success');
    auxTitle = "FELICITACIONES!"; 
    auxText = "Ganaste el juego de Piedras, Papel o Tijeras :)";
  } else {
    alertResultItem.classList.add('alert-danger');
    auxTitle = "MALA SUERTE!"; 
    auxText = "Perdiste el juego de Piedras, Papel o Tijeras :(";
  }

  alertResultItem.innerHTML = '<h4 class="alert-heading">' + auxTitle + '</h4>' + 
                              '<p>' + auxText + '</p>';
  container.appendChild(alertResultItem);
}