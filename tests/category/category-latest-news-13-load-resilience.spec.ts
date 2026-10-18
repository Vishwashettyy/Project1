import { expect, test } from '../../fixtures/news18.fixture';
import type { Route } from '@playwright/test';

test.describe('News18 Latest News Category Page', () => {
  test('Slow and interrupted loading resilience', async ({ latestNews }) => {
    // 1. Load the page normally and verify its primary category content.
    await latestNews.goto();
    await expect(latestNews.categoryHeading).toBeVisible();
    await expect(latestNews.storyLinks.first()).toBeVisible();

    // 2. Fail one nonessential image request and ensure category navigation still works.
    let imageAborted = false;
    const abortOneImage = async (route: Route): Promise<void> => {
      if (!imageAborted && route.request().resourceType() === 'image') {
        imageAborted = true;
        await route.abort();
        return;
      }
      await route.continue();
    };

    await latestNews.page.route('**/*', abortOneImage);
    try {
      await latestNews.goto();
      await expect(latestNews.categoryHeading).toBeVisible();
      await expect(latestNews.primaryNavigation).toBeVisible();
      expect(imageAborted).toBe(true);
    } finally {
      await latestNews.page.unroute('**/*', abortOneImage);
    }
  });
});
