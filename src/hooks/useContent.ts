import { mockContent } from '@/content/mock';
import type { PageContent } from '@/types/content';

export function useContent<K extends keyof PageContent>(section: K): PageContent[K] {
  return mockContent[section];
  // later: swap the internals for a real fetch/query — same typed return
  // shape, zero changes required in any component that calls this.
}
