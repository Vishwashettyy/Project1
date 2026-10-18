import { expect, test } from '../../fixtures/news18.fixture';

test.describe('News18 Latest News Category Page', () => {
  test('Latest News page direct load and identity', async ({ latestNews }) => {
    // 1. Navigate directly to Latest News and verify its route, identity, and primary content.
    await latestNews.goto();
    await expect(latestNews.page).toHaveURL(/^https:\/\/www\.news18\.com\/news\/?$/);
    await expect(latestNews.page).toHaveTitle(/Latest News.*News18/i);
    await expect(latestNews.categoryHeading).toBeVisible();
    await expect(latestNews.description).toBeVisible();
    await expect(latestNews.storyLinks.first()).toBeVisible();

    // 2. Verify the initial viewport includes the site header and category identity.
    await expect(latestNews.header).toBeVisible();
    await expect(latestNews.primaryNavigation).toBeVisible();
    await expect(latestNews.categoryHeading).toBeInViewport();
  });
});
