/// VARIABLES
let numGames = 0;

/// CICLOS
//WHILE
do {
  numGames = prompt("Ingrese la cantidad de partidas a jugar (numero impar)");
} while (!isOdd(numGames));

//FOR
for (let i = 1; i <= numGames; i++) {
  // JUGADA JUGADOR
  movePlayer = prompt("Ingrese Piedra [1], Papel [2] ó Tijera [3]: ");
//   console.log("Eligio " + moveToText(movePlayer));
  // JUGADA MAQUINA
  moveIA = randomMove();
//   console.log("Eligio " + moveToText(moveIA));

  //RESULTADOS
  alert('Partida ' + i + ': Jugador sacó [' + moveToText(movePlayer) + '] vs Maquina sacó [' + moveToText(moveIA) + ']\n Resultado: ' + gameResult(movePlayer, moveIA) + '!');
  console.log('Partida ' + i + ': Jugador sacó [' + moveToText(movePlayer) + '] vs Maquina sacó [' + moveToText(moveIA) + ']');
  console.log('Resultado: ' + gameResult(movePlayer, moveIA) + '!');
}

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

function gameResult(move1, move2) {
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