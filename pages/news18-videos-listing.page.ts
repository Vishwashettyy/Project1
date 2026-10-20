import type { Locator, Page } from '@playwright/test';

export class News18VideosListingPage {
  readonly header: Locator;
  readonly news18Logo: Locator;
  readonly mainContent: Locator;
  readonly pageHeading: Locator;
  readonly description: Locator;
  readonly videoCards: Locator;
  readonly firstVideoHeading: Locator;

  constructor(readonly page: Page) {
    this.header = page.locator('header');
    this.news18Logo = this.header.locator('a[href="https://www.news18.com/"]').first();
    this.mainContent = page.locator('main');
    this.pageHeading = this.mainContent.getByRole('heading', {
      name: /^latest videos$/i,
      level: 1,
    });
    this.description = this.mainContent.getByRole('heading', {
      name: /watch latest videos on breaking news/i,
    });
    this.videoCards = this.mainContent.locator('.vdchld');
    this.firstVideoHeading = this.videoCards.first().getByRole('heading', { level: 2 });
  }

  async goto(): Promise<void> {
    await this.page.goto('https://www.news18.com/videos/', {
      waitUntil: 'domcontentloaded',
    });
  }
}
