export type CatalogItem = {
  id: string;
  title: string;
  year?: number;
  type: 'movie' | 'book';
  coverUrl?: string;
  genres?: string[];
  authorOrDirector?: string;
};
