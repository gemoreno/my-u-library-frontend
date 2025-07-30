export interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  year_published?: string;
}

export interface BookFilters {
  title?: string;
  author?: string;
  genre?: string;
}
