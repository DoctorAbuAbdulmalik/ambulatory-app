export type SiteNewsStatus = 'published' | 'draft';

export interface SiteNewsRow {
  id: string;
  status: SiteNewsStatus;
}

export const SITE_NEWS_STATUS_LABELS: Record<SiteNewsStatus, string> = {
  published: 'منشور',
  draft: 'مسودة',
};
