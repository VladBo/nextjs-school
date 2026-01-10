export interface StrapiMedia {
  id: number;
  url: string;
  name?: string;
  mime?: string;
}

export interface H5PContent {
  id: number;
  documentId: string;
  title: string;
  h5pFile: StrapiMedia;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
}

export interface H5PContentsResponse {
  data: H5PContent[];
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface H5PContentResponse {
  data: H5PContent;
}
