import { expect, test } from '../../fixtures/news18.fixture';

test.describe('News18 Latest News Category Page', () => {
  test('Global navigation and breadcrumb behavior', async ({ latestNews }) => {
    // 1. Open a top-level section from the Latest News page and return.
    await latestNews.goto();
    await expect(latestNews.primaryNavigation).toBeVisible();
    await latestNews.primaryNavigation.getByRole('link', { name: 'India' }).click();
    await expect(latestNews.page).toHaveURL(/\/india\//);
    await latestNews.goto();
    await expect(latestNews.categoryHeading).toBeVisible();

    // 2. Use the Home breadcrumb to visit the homepage, then return to Latest News.
    await latestNews.mainContent.getByRole('link', { name: 'Home', exact: true }).first().click();
    await expect(latestNews.page).toHaveURL(/^https:\/\/www\.news18\.com\/?$/);
    await latestNews.goto();
    await expect(latestNews.categoryHeading).toBeVisible();
  });
});
