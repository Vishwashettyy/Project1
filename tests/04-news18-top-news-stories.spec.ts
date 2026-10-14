import { expect, test } from '../fixtures/news18.fixture';

test.describe('News18 Homepage', () => {
  test('Top News story cards and links', async ({ homepage }) => {
    // 1. Load the homepage and locate a linked story in Top News.
    await homepage.goto();
    await expect(homepage.topNewsHeading).toBeVisible();
    const topNews = homepage.topNewsHeading.locator('xpath=..').locator('xpath=..');
    const storyLink = topNews.getByRole('link').first();
    await expect(storyLink).toHaveAttribute('href', /.+/);

    // 2. Open the story, verify article content, and return to the homepage.
    await storyLink.click();
    await expect(homepage.page).toHaveURL(/\.html(?:$|\?)/);
    await expect(homepage.page).toHaveTitle(/.+/);
    await homepage.goto();
    await expect(homepage.topNewsHeading).toBeVisible();
  });
});
