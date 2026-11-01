export interface H5PContentData {
  library: string;
  contentId: number;
}

export interface H5PContent {
  id: number;
  documentId: string;
  title: string;
  sourceLocale?: string | null;
  h5pContent: H5PContentData | null;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
}

export function getLibraryDisplayName(
  library: string | null | undefined
): string {
  if (!library) return 'Невідомий тип';

  const libraryMap: Record<string, string> = {
    'H5P.MultiChoice': 'Вибір відповіді',
    'H5P.QuestionSet': 'Вікторина',
    'H5P.TrueFalse': 'Так або ні',
    'H5P.Blanks': 'Заповнення пропусків',
    'H5P.DragQuestion': 'Перетягування',
    'H5P.DragText': 'Перетягування слів',
    'H5P.MarkTheWords': 'Позначення слів',
    'H5P.InteractiveVideo': 'Інтерактивне відео',
    'H5P.CoursePresentation': 'Навчальна презентація',
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
