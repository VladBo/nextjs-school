export interface H5PQuiz {
  id: number;
  title?: string;
  description?: string;
  grade?: string;
  subject?: string;
  difficulty?: string;
  estimatedTime?: number;
  featured?: boolean;
  thumbnail?: {
    url?: string;
    alternativeText?: string;
  };
  category?: {
    id: number;
    name?: string;
  };
}

export interface H5PQuizzesResponse {
  data: H5PQuiz[];
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface H5PQuizResponse {
  data: H5PQuiz;
}
