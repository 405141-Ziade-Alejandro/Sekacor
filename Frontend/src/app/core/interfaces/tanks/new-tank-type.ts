export interface NewTankType {
  type: string;
  cover: string;
  quantity: number;
  plasticBlack: number;
  plasticColor: number;
  cost: number;
  coverType: string;
  screws: number;
  bigScrews: number;
  tee: boolean;
  sticker: string;
  //to do: make two types of stocks (stock 1 and stock 2)
  stock1: number;
  stock2: number;
  ramal: string;
  oring: string;
}
