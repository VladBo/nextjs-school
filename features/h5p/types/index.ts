export interface H5PContentData {
  library: string;
  contentId: number;
}

export interface H5PContent {
  id: number;
  documentId: string;
  title: string;
  slug?: string | null;
  legacyPath?: string | null;
  legacyNid?: number | null;
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

const CYRILLIC_TO_LATIN: Record<string, string> = {
  а: 'a',
  б: 'b',
  в: 'v',
  г: 'h',
  ґ: 'g',
  д: 'd',
  е: 'e',
  є: 'ye',
  ж: 'zh',
  з: 'z',
  и: 'y',
  і: 'i',
  ї: 'yi',
  й: 'y',
  к: 'k',
  л: 'l',
  м: 'm',
  н: 'n',
  о: 'o',
  п: 'p',
  р: 'r',
  с: 's',
  т: 't',
  у: 'u',
  ф: 'f',
  х: 'kh',
  ц: 'ts',
  ч: 'ch',
  ш: 'sh',
  щ: 'shch',
  ю: 'yu',
  я: 'ya',
  ь: '',
  ъ: '',
  ы: 'y',
  э: 'e',
  ё: 'yo',
};

export function getH5PRouteSlug(content: H5PContent): string {
  if (content.slug) return content.slug;
  const source =
    content.legacyPath?.split('/').filter(Boolean).at(-1) || content.title;
  return (
    source
      .toLowerCase()
      .split('')
      .map((character) => CYRILLIC_TO_LATIN[character] ?? character)
      .join('')
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') ||
    `quiz-${content.legacyNid ?? content.documentId}`
  );
}
