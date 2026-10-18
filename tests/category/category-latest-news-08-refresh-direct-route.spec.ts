import { expect, test } from '../../fixtures/news18.fixture';

test.describe('News18 Latest News Category Page', () => {
  test('Direct route, refresh, and browser history', async ({ latestNews }) => {
    // 1. Load the root category route directly, refresh, and verify its identity.
    await latestNews.goto();
    await expect(latestNews.page).toHaveTitle(/Latest News.*News18/i);
    await expect(latestNews.categoryHeading).toBeVisible();
    await latestNews.page.reload();
    await expect(latestNews.categoryHeading).toBeVisible();

    // 2. Load page 2 directly, refresh it, and navigate back and forward.
    await latestNews.goto('/news/page-2/');
    await expect(latestNews.categoryHeading).toBeVisible();
    await latestNews.page.reload();
    await expect(latestNews.page).toHaveURL(/\/news\/page-2\/?/);
    await latestNews.page.goBack();
    await expect(latestNews.page).toHaveURL(/^https:\/\/www\.news18\.com\/news\/?$/);
    await latestNews.page.goForward();
    await expect(latestNews.page).toHaveURL(/\/news\/page-2\/?/);
    await expect(latestNews.categoryHeading).toBeVisible();
  });
});
