import type { Locator, Page } from '@playwright/test';

export class News18ArticlePage {
  readonly header: Locator;
  readonly news18Logo: Locator;
  readonly article: Locator;
  readonly homeBreadcrumb: Locator;
  readonly indiaBreadcrumb: Locator;
  readonly pageHeading: Locator;
  readonly summary: Locator;
  readonly publicationTime: Locator;
  readonly heroImage: Locator;
  readonly bodyParagraphs: Locator;

  constructor(readonly page: Page) {
    this.header = page.locator('header');
    this.news18Logo = this.header.locator('a[href="https://www.news18.com/"]').first();
    this.article = page.locator('main article');
    this.homeBreadcrumb = this.article.locator('a[href="/"]').first();
    this.indiaBreadcrumb = this.article.locator('a[href="/india/"]').first();
    this.pageHeading = this.article.getByRole('heading', { level: 1 });
    this.summary = this.article.locator('h2.asubttl-schema');
    this.publicationTime = this.article.locator('time').first();
    this.heroImage = this.article.locator('figure img').first();
    this.bodyParagraphs = this.article.locator('p[class*="story_para_"]');
  }

  async goto(): Promise<void> {
    await this.page.goto(
      'https://www.news18.com/india/tiger-shroff-firing-case-vlogger-umesh-chauhan-recounts-shooting-ws-l-10389825.html',
      { waitUntil: 'domcontentloaded' },
    );
  }
}
