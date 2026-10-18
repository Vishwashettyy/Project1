import { expect, test } from '../../fixtures/news18.fixture';

test.describe('News18 Latest News Category Page', () => {
  test('Lead story cards and article navigation', async ({ latestNews }) => {
    // 1. Find the first linked lead story dynamically and verify it has a destination.
    await latestNews.goto();
    await expect(latestNews.categoryHeading).toBeVisible();
    const leadStory = latestNews.storyLinks.first();
    await expect(leadStory).toHaveAttribute('href', /.+/);

    // 2. Open the lead story, verify an article destination, and return to Latest News.
    await leadStory.click();
    await expect(latestNews.page).toHaveURL(/\.html(?:$|\?)/);
    await expect(latestNews.page).toHaveTitle(/.+/);
    await latestNews.goto();
    await expect(latestNews.categoryHeading).toBeVisible();
  });
});
