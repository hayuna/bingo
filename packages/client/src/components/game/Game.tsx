import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import gameContext from "../../gameContext";
import { ICellProps, IPlayMatrix, TypeSymbol } from "../../helper/models/Game.models";
import gameService from "../../services/gameService";
import socketService from "../../services/socketService";

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "Zen Tokyo Zoo", cursive;
  position: relative;
`;

const RowContainer = styled.div`
  width: 100%;
  display: flex;
`;

const Cell = styled.div<ICellProps>`
  width: 10em;
  height: 10em;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  cursor: pointer;
  border-top: ${({ borderTop }) => borderTop && "3px solid #8e44ad"};
  border-left: ${({ borderLeft }) => borderLeft && "3px solid #8e44ad"};
  border-bottom: ${({ borderBottom }) => borderBottom && "3px solid #8e44ad"};
  border-right: ${({ borderRight }) => borderRight && "3px solid #8e44ad"};
  transition: all 270ms ease-in-out;

  &:hover {
    background-color: #8d44ad28;
  }
`;

const PlayStopper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 99;
  cursor: default;
`;


const tasks: string[] = [
  "task1",
  "task2",
  "task3",
  "task4",
  "task5",
  "task6",
  "task7",
  "task8",
  "task9",
  "task10",
  "task11",
  "task12",
  "task13",
  "task14",
  "task15",
  "task16",
  "task17",
  "task18",
  "task19",
  "task20",
  "task21",
  "task22",
  "task23",
  "task24",
  "task25",
];


export const Game = () => {
  const [matrix, setMatrix] = useState<IPlayMatrix>([
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
  ]);

  const {
    playerSymbol,
    setPlayerSymbol,
    setPlayerTurn,
    isPlayerTurn,
    setGameStarted,
    isGameStarted,
  } = useContext(gameContext);

  const checkGameState = (matrix: IPlayMatrix) => {
    for (let i = 0; i < matrix.length; i++) {
      let row = [];
      for (let j = 0; j < matrix[i].length; j++) {
        row.push(matrix[i][j]);
      }

      if (row.every((value) => value && value === playerSymbol)) {
        return [true, false];
      } else if (row.every((value) => value && value !== playerSymbol)) {
        return [false, true];
      }
    }

    for (let i = 0; i < matrix.length; i++) {
      let column = [];
      for (let j = 0; j < matrix[i].length; j++) {
        column.push(matrix[j][i]);
      }

      if (column.every((value) => value && value === playerSymbol)) {
        return [true, false];
      } else if (column.every((value) => value && value !== playerSymbol)) {
        return [false, true];
      }
    }

    if (matrix[1][1]) {
      if (matrix[0][0] === matrix[1][1] && matrix[2][2] === matrix[1][1]) {
        if (matrix[1][1] === playerSymbol) return [true, false];
        else return [false, true];
      }

      if (matrix[2][0] === matrix[1][1] && matrix[0][2] === matrix[1][1]) {
        if (matrix[1][1] === playerSymbol) return [true, false];
        else return [false, true];
      }
    }

    //Check for a tie
    if (matrix.every((m) => m.every((v) => v !== null))) {
      return [true, true];
    }

    return [false, false];
  };

  const updateGameMatrix = (column: number, row: number, symbol: TypeSymbol) => {
    const newMatrix = [...matrix];
    const field = newMatrix[row][column];

    if(field?.includes(symbol)) return;

    if(field === TypeSymbol.o || field === TypeSymbol.x) {
      newMatrix[row][column] = TypeSymbol.ox;
      setMatrix(newMatrix);
    } else if (field === null || field === 'null') {
      newMatrix[row][column] = symbol;
      setMatrix(newMatrix);
    }

    if (socketService.socket) {
      gameService.updateGame(socketService.socket, newMatrix);
      const [currentPlayerWon, otherPlayerWon] = checkGameState(newMatrix);
      if (currentPlayerWon && otherPlayerWon) {
        gameService.gameWin(socketService.socket, "The Game is a TIE!");
        alert("The Game is a TIE!");
      } else if (currentPlayerWon && !otherPlayerWon) {
        gameService.gameWin(socketService.socket, "You Lost!");
        alert("You Won!");
      }

      setPlayerTurn(false);
    }
  };

  const handleGameUpdate = () => {
    if (socketService.socket)
      gameService.onGameUpdate(socketService.socket, (newMatrix) => {
        setMatrix(newMatrix);
        checkGameState(newMatrix);
        setPlayerTurn(true);
      });
  };

  const handleGameStart = () => {
    if (socketService.socket)
      gameService.onStartGame(socketService.socket, (options: {symbol: TypeSymbol; start: any}) => {
        setGameStarted(true);
        setPlayerSymbol(options.symbol);
        if (options.start) setPlayerTurn(true);
        else setPlayerTurn(false);
      });
  };

  const handleGameWin = () => {
    if (socketService.socket)
      gameService.onGameWin(socketService.socket, (message) => {
        setPlayerTurn(false);
        alert(message);
      });
  };

  useEffect(() => {
    handleGameUpdate();
    handleGameStart();
    handleGameWin();
  }, []);

  const chooseColor = (column: TypeSymbol | null | 'null') => {
    switch (column) {
      case TypeSymbol.x:
        return "red";
      case TypeSymbol.o:
        return "blue";
      case TypeSymbol.ox:
        return 'linear-gradient(135deg, rgba(225,0,0,1) 49%, rgba(0,0,225,1) 50%)';
    }
  }

  return (
    <GameContainer>
      {localStorage.getItem("nickname")}
      {JSON.stringify({ isPlayerTurn })}
      {!isGameStarted && (
        <h2>Waiting for Other Player to Join to Start the Game!</h2>
      )}
      {(!isGameStarted || !isPlayerTurn) && <PlayStopper />}
      {matrix.map((row, rowIdx) => {

        return (
          <RowContainer key={rowIdx}>
            {row.map((column, columnIdx) => {
              const background = column ? chooseColor(column) : ''
              return (
                <Cell
                  key={columnIdx}
                  className={`cell-${rowIdx}-${columnIdx}`}
                  borderRight={columnIdx < 4}
                  borderLeft={columnIdx > 0}
                  borderBottom={rowIdx < 4}
                  borderTop={rowIdx > 0}
                  onClick={() =>
                    updateGameMatrix(columnIdx, rowIdx, playerSymbol)
                  }
                  style={{
                    background,
                  }}
                >{tasks[rowIdx * 5 + columnIdx]}</Cell>
              );
            })}
          </RowContainer>
        );
      })}
    </GameContainer>
  );
}
