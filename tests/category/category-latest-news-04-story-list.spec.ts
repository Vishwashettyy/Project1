import { expect, test } from '../../fixtures/news18.fixture';

test.describe('News18 Latest News Category Page', () => {
  test('Latest News article list content and links', async ({ latestNews }) => {
    // 1. Locate the Latest News feed and verify multiple dynamically populated story links.
    await latestNews.goto();
    await expect(latestNews.latestFeedHeading).toBeVisible();
    await latestNews.latestFeedHeading.scrollIntoViewIfNeeded();
    await expect(latestNews.feedStoryLinks.nth(2)).toBeVisible();

    // 2. Open a feed item and return to the category page.
    const feedStory = latestNews.feedStoryLinks.nth(2);
    await expect(feedStory).toHaveAttribute('href', /.+/);
    await feedStory.click();
    await expect(latestNews.page).toHaveURL(/\.html(?:$|\?)/);
    await latestNews.goto();
    await expect(latestNews.latestFeedHeading).toBeVisible();
  });
});
