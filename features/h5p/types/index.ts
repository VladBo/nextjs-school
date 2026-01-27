export interface StrapiMedia {
  id: number;
  url: string;
  name?: string;
  mime?: string;
}

export interface H5PContentData {
  library: string;
  contentId: number;
}

export interface H5PContent {
  id: number;
  documentId: string;
  title: string;
  h5pFile: StrapiMedia | null;
  h5pContent: H5PContentData | null;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
}

export function getLibraryDisplayName(
  library: string | null | undefined
): string {
  if (!library) return 'Unknown';

  const libraryMap: Record<string, string> = {
    'H5P.MultiChoice': 'Multiple Choice',
    'H5P.QuestionSet': 'Quiz',
    'H5P.TrueFalse': 'True/False',
    'H5P.Blanks': 'Fill in the Blanks',
    'H5P.DragQuestion': 'Drag & Drop',
    'H5P.DragText': 'Drag the Words',
    'H5P.MarkTheWords': 'Mark the Words',
    'H5P.InteractiveVideo': 'Interactive Video',
    'H5P.CoursePresentation': 'Course Presentation',
  };

  // Extract base library name (e.g., "H5P.QuestionSet 1.20" -> "H5P.QuestionSet")
  const baseName = library.split(' ')[0];
  return libraryMap[baseName] || baseName.replace('H5P.', '');
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
