import { expect, test } from '../../fixtures/news18.fixture';
import type { Route } from '@playwright/test';

test.describe('News18 Homepage', () => {
  test('Slow and interrupted resource resilience', async ({ homepage }) => {
    // 1. Load the homepage normally and verify primary content.
    await homepage.goto();
    await expect(homepage.topNewsHeading).toBeVisible();

    // 2. Abort one image request and verify homepage navigation and content remain usable.
    let imageAborted = false;
    const abortOneImage = async (route: Route): Promise<void> => {
      if (!imageAborted && route.request().resourceType() === 'image') {
        imageAborted = true;
        await route.abort();
        return;
      }
      await route.continue();
    };

    await homepage.page.route('**/*', abortOneImage);
    try {
      await homepage.goto();
      await expect(homepage.topNewsHeading).toBeVisible();
      await expect(homepage.primaryNavigation).toBeVisible();
      expect(imageAborted).toBe(true);
    } finally {
      await homepage.page.unroute('**/*', abortOneImage);
    }
  });
});
