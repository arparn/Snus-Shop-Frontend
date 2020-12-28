export interface Item {
  id: number;
  name: string;
  url: string;
  price: string;
  description: string;
  rating: number;
  strength: number;
  comments: Comment[];
}
