import React from "react";
import { TypeSymbol } from "./helper/models/Game.models";
// import { Symbol } from './components/game'
export interface IGameContextProps {
    isInRoom: boolean;
    setInRoom: (inRoom: boolean) => void;
    playerSymbol: TypeSymbol;
    setPlayerSymbol: (symbol: TypeSymbol) => void;
    isPlayerTurn: boolean;
    setPlayerTurn: (turn: boolean) => void;
    isGameStarted: boolean;
    setGameStarted: (started: boolean) => void;
}

const defaultState: IGameContextProps = {
    isInRoom: false,
    setInRoom: () => { },
    playerSymbol: TypeSymbol.x,
    setPlayerSymbol: () => { },
    isPlayerTurn: false,
    setPlayerTurn: () => { },
    isGameStarted: false,
    setGameStarted: () => { },
};

export default React.createContext(defaultState);