export interface ICellProps {
    borderTop?: boolean;
    borderRight?: boolean;
    borderLeft?: boolean;
    borderBottom?: boolean;
}

export enum TypeSymbol {
    x = "x",
    o = "o",
    ox = "ox",
}
export type IPlayMatrix = Array<Array<TypeSymbol | null | 'null'>>;
export interface IStartGame {
    start: boolean;
    symbol: TypeSymbol;
}