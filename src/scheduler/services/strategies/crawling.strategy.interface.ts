export interface CrawlingStrategy {
  crawl(domain: string, path: string): void;
}
