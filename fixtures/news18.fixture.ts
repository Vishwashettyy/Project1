import { test as base, expect } from '@playwright/test';
import { News18HomepagePage } from '../pages/news18-homepage.page';

type News18Fixtures = {
  homepage: News18HomepagePage;
};

export const test = base.extend<News18Fixtures>({
  homepage: async ({ page }, use) => {
    await use(new News18HomepagePage(page));
  },
});

export { expect };
