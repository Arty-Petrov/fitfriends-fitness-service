export interface Review {
  id?: number;
  trainingId: number;
  authorId: string;
  text: string;
  evaluation: number;
  createdAt?: Date;
}
