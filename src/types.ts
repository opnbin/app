export type ListPastes = {
  pastes: {
    id: string;
    name: string;
    description: string;
    language: string;
    content: string;
    created_at: string;
    updated_at: string;
  }[];
  page: number;
  limit: number;
  total: number;
};
