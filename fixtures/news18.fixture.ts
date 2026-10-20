import { test as base, expect } from '@playwright/test';
import { News18HomepagePage } from '../pages/news18-homepage.page';
import { News18LatestNewsPage } from '../pages/news18-latest-news.page';
import { News18PhotoGalleryPage } from '../pages/news18-photogallery.page';

type News18Fixtures = {
  homepage: News18HomepagePage;
  latestNews: News18LatestNewsPage;
  photoGallery: News18PhotoGalleryPage;
};

export const test = base.extend<News18Fixtures>({
  homepage: async ({ page }, use) => {
    await use(new News18HomepagePage(page));
  },
  latestNews: async ({ page }, use) => {
    await use(new News18LatestNewsPage(page));
  },
  photoGallery: async ({ page }, use) => {
    await use(new News18PhotoGalleryPage(page));
  },
});

export { expect };
