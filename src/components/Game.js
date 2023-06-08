import { useState, useEffect } from "react";
import Square from "./Square";
import WinnerScreen from "./WinnerScreen";
import { Patterns } from "../utilities/Patterns";
import PlayerSelectionScreen from "./PlayerSelection";
import { PlayerInput,GameHistory } from "./PlayerSelection";

//game sounds initialize
const click = new Audio("./click.mp3");
const gameWinnerSound = new Audio("./win.wav");
const restartSound = new Audio("./restart.wav");

//game sound functions
const clickPlay = () => {
  click.play();
};
const gameWinner = () => {
  gameWinnerSound.play();
};
const gameRestart = () => {
  restartSound.play();
};
   

function Game() {
  const [gameStart, setGameStart] = useState(false);
  const [isPlayerSelected, setIsPlayerSelected] = useState(false);
  const [firstUsernameScreen, setFirstUsernameScreen] = useState(false);
  const [secondUsernameScreen, setSecondUsernameScreen] = useState(false);
  const [username, setUsername] = useState("");
  const [usernames, setUsernames] = useState({});
  const [gameHistory, setGameHistory] = useState([]);

  

  //box index
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  //player turn
  const [player, setPlayer] = useState("🟡");
  //result
  const [result, setResult] = useState({ winner: "none", state: "none" });
  //checkwin
  const [wined, setWin] = useState(false);

  useEffect(() => {
    checkWin();
    checkIfTie();

    if (player == "❌") {
      setPlayer("🟡");
    } else {
      setPlayer("❌");
    }
  }, [board]);

  //render winner
  useEffect(() => {
    if (result.state != "none") {
      setWin(true);
      gameWinner();
      // alert(`Game Finished! Winning Player: ${result.winner}`);
    }
  }, [result]);

  useEffect(() => {
    if (Object.keys(usernames).length === 2) {
      setGameStart(true);
      setSecondUsernameScreen(false);
    }
  }, [usernames]);

  const initGame = () => {
    setGameStart(false);
    setIsPlayerSelected(false);
    setFirstUsernameScreen(false);
    setSecondUsernameScreen(false);
    setUsername("");
    // setUsernames({});
    setGameHistory([]);
  };

  //handling click on box
  const handleClick = (square) => {
    if(board[square] !== "") return;
    clickPlay();

    const updatedBoard = board.map((val, idx) => {
      if (idx == square && val == "") {
        return player;
      }
      return val;
    });
    setBoard(updatedBoard);
    gameHistory.push({
      history: updatedBoard,
      player: usernames[player],
      playerSign: player,
    });
    setGameHistory([...gameHistory]);
  };

  //checking winners
  const checkWin = () => {
    Patterns.forEach((currPattern) => {
      const firstPlayer = board[currPattern[0]];
      if (firstPlayer == "") return;
      let foundWinningPattern = true;
      currPattern.forEach((idx) => {
        if (board[idx] != firstPlayer) {
          foundWinningPattern = false;
        }
      });

      if (foundWinningPattern) {
        setResult({ winner: player, state: "Won" });
        initGame();
      }
    });
  };

  //restart
  const restartGame = () => {
    gameRestart();
    setBoard(["", "", "", "", "", "", "", "", ""]);
    setPlayer("🟡");
    setWin(false);
    setUsernames({});
  };

  //checking for tie
  const checkIfTie = () => {
    let filled = true;
    board.forEach((square) => {
      if (square == "") {
        filled = false;
      }
    });

    if (filled) {
      setResult({ winner: "No One", state: "Tie" });
    }
  };

  const handlePlayerSelection = (player) => {
    setPlayer(player);
    setFirstUsernameScreen(true);
    setIsPlayerSelected(true);
  };

  const handleUsername = () => {
    usernames[player] = username;
    if (player === "❌") {
      setPlayer("🟡");
    } else {
      setPlayer("❌");
    }
    setUsernames({ ...usernames });
    setUsername("");
    setFirstUsernameScreen(false);
    setSecondUsernameScreen(true);
  };

  const handleGameHistory = (gHistory, index) => {
    console.log({ gHistory });
    //reset game according to history

    setBoard(gHistory.history);
    const updatedGameHistory = gameHistory.slice(0, index + 1);
    setGameHistory(updatedGameHistory);
  };

  console.log({ usernames, board, gameHistory });

  return (
    <div className="Game">
      {!isPlayerSelected && (
        <PlayerSelectionScreen handlePlayerSelection={handlePlayerSelection} />
      )}
      {firstUsernameScreen && (
        <PlayerInput
          label={`Player Name: ${username}`}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          handleUsername={handleUsername}
        />
      )}
      {secondUsernameScreen && (
        <PlayerInput
          label={`Another Player Name: ${username}`}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          handleUsername={handleUsername}
        />
      )}
      {gameStart && (
        <div style={{ display: 'flex' }}>
          <div className="board">
            <h1 className="title">
              Let's Play <br /> Tic Tac T🟡e
            </h1>
            <div className="row">
              <Square
                chooseSquare={() => {
                  handleClick(0);
                }}
                val={board[0]}
              />
              <Square
                chooseSquare={() => {
                  handleClick(1);
                }}
                val={board[1]}
              />
              <Square
                chooseSquare={() => {
                  handleClick(2);
                }}
                val={board[2]}
              />
            </div>
            <div className="row">
              <Square
                chooseSquare={() => {
                  handleClick(3);
                }}
                val={board[3]}
              />
              <Square
                chooseSquare={() => {
                  handleClick(4);
                }}
                val={board[4]}
              />
              <Square
                chooseSquare={() => {
                  handleClick(5);
                }}
                val={board[5]}
              />
            </div>
            <div className="row">
              <Square
                chooseSquare={() => {
                  handleClick(6);
                }}
                val={board[6]}
              />
              <Square
                chooseSquare={() => {
                  handleClick(7);
                }}
                val={board[7]}
              />
              <Square
                chooseSquare={() => {
                  handleClick(8);
                }}
                val={board[8]}
              />
            </div>
          </div>
          <GameHistory
            gameHistory={gameHistory}
            handleGameHistory={handleGameHistory}
          />
        </div>
      )}
      {wined ? (
        <WinnerScreen username={usernames[result.winner]} restartGame={restartGame} playerWon={result.winner} />
      ) : null}
    </div>
  );
}

export default Game;
