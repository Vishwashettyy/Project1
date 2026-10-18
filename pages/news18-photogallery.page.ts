import type { Locator, Page } from '@playwright/test';

export class News18PhotoGalleryPage {
  readonly header: Locator;
  readonly primaryNavigation: Locator;
  readonly trending: Locator;
  readonly mainContent: Locator;
  readonly pageHeading: Locator;
  readonly description: Locator;
  readonly breadcrumb: Locator;
  readonly categoryLinks: Locator;
  readonly storyLinks: Locator;
  readonly galleryCards: Locator;
  readonly sectionHeadings: Locator;
  readonly viewMoreLinks: Locator;
  readonly footer: Locator;

  constructor(readonly page: Page) {
    this.header = page.locator('header');
    this.primaryNavigation = page.locator('#desknav');
    this.trending = page.getByText(/^trending:?$/i).locator('xpath=../..');
    this.mainContent = page.locator('main');
    this.pageHeading = this.mainContent.getByRole('heading', {
      name: /^photo gallery$/i,
      level: 1,
    });
    this.description = this.mainContent.getByRole('heading', {
      name: /collection of high-quality photo galleries/i,
    });
    this.breadcrumb = this.mainContent.getByRole('link', { name: /^home\b/i }).first();
    this.categoryLinks = this.mainContent.getByRole('link', {
      name: /^(All|Movies|Lifestyle|India|Cities|Cricket|Business|Viral|Education|World|Sports)$/i,
    });
    this.storyLinks = this.mainContent.locator('a[href*=".html"]');
    this.galleryCards = this.mainContent.locator('a').filter({
      has: page.locator('h2, h3'),
    });
    this.sectionHeadings = this.mainContent.getByRole('heading', { level: 2 });
    this.viewMoreLinks = this.mainContent.getByRole('link', {
      name: /view more/i,
    });
    this.footer = page.getByRole('contentinfo');
  }

  async goto(): Promise<void> {
    await this.page.goto('https://www.news18.com/photogallery/');
  }

  async scrollToFooter(): Promise<void> {
    await this.footer.scrollIntoViewIfNeeded();
  }

  async reload(): Promise<void> {
    await this.page.reload();
  }
}
