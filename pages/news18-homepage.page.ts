import type { Locator, Page } from '@playwright/test';

export class News18HomepagePage {
  readonly header: Locator;
  readonly primaryNavigation: Locator;
  readonly mainContent: Locator;
  readonly topNewsHeading: Locator;
  readonly englishEdition: Locator;

  constructor(readonly page: Page) {
    this.header = page.locator('header');
    this.primaryNavigation = page.locator('#desknav');
    this.mainContent = page.locator('main');
    this.topNewsHeading = page.getByRole('heading', { name: /top news/i });
    this.englishEdition = page.getByText('English Edition', { exact: true });
  }

  async goto(): Promise<void> {
    await this.page.goto('https://www.news18.com/');
  }
}
