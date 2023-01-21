export interface CardInterface {
  name: string;
  price: number;
  category: string;
  description: string;
};

export interface CardsInterface {
  cards: CardInterface[]
};