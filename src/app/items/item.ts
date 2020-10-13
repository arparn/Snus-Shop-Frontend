export interface Item {
  id: number;
  name: string;
  url: string;
  price: number;
  description: string;
  rating: number;
  strength: number;
  comments: Comment[];
}
