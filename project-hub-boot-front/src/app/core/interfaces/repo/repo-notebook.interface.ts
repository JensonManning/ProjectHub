export interface NotebookRepo {
  id: number;
  name: string;
  description: string;
  content: string;
}

export interface NotebookRepoCreate {
  name: string;
  description: string;
  content: string;
}