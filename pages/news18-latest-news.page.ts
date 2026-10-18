import type { Locator, Page } from '@playwright/test';

export class News18LatestNewsPage {
  readonly header: Locator;
  readonly primaryNavigation: Locator;
  readonly mainContent: Locator;
  readonly categoryHeading: Locator;
  readonly description: Locator;
  readonly latestFeedHeading: Locator;
  readonly storyLinks: Locator;
  readonly feedStoryLinks: Locator;
  readonly paginationLinks: Locator;
  readonly footer: Locator;
  readonly askNews18Trigger: Locator;

  constructor(readonly page: Page) {
    this.header = page.locator('header');
    this.primaryNavigation = page.locator('#desknav');
    this.mainContent = page.locator('main');
    this.categoryHeading = this.mainContent.getByRole('heading', {
      name: /^latest news(?:\s*-\s*page\s+\d+)?$/i,
    }).first();
    this.description = this.mainContent.getByText(
      /Stay informed with our detailed coverage of news from India and around the world/i,
    );
    this.latestFeedHeading = this.mainContent.getByRole('heading', {
      name: /^latest news$/i,
    }).last();
    this.storyLinks = this.mainContent.locator('a[href*=".html"]');
    this.feedStoryLinks = this.latestFeedHeading.locator(
      'xpath=following::a[contains(@href, ".html")]',
    );
    this.paginationLinks = this.mainContent.getByRole('link', { name: /^\d+$/ });
    this.footer = page.getByRole('contentinfo');
    this.askNews18Trigger = page.getByText('ask news18', { exact: true });
  }

  async goto(path = '/news/'): Promise<void> {
    await this.page.goto(`https://www.news18.com${path}`);
  }

  async scrollToPagination(): Promise<void> {
    await this.paginationLinks.first().scrollIntoViewIfNeeded();
  }
}
