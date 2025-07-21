export interface Article {
  id: number;
  title: string;
  author: string;
  publicationDate: string; // Formato string, ex: "YYYY-MM-DD"
  imageUrl: string;
  summary: string;
  content: string; // Pode conter tags HTML
}
