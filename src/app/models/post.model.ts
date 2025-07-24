export interface Post {
  id?: number;
  userId: number;
  imageUrl?: string;
  caption?: string;
  createdAt: Date;
  likes: number;
  likedByUsers?: number[];
  title?: string;
  comment?: string;
}
