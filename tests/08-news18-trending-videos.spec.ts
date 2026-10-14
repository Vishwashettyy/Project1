import { expect, test } from '../fixtures/news18.fixture';

test.describe('News18 Homepage', () => {
  test('Trending Videos carousel controls', async ({ homepage }) => {
    // 1. Load homepage and verify the Trending Videos section is present.
    await homepage.goto();
    const trendingVideos = homepage.page.getByRole('link', { name: 'Trending Videos' }).first();
    await expect(trendingVideos).toBeVisible();

    // 2. Advance and reverse the carousel using its accessible controls.
    const nextVideos = homepage.page.getByRole('button', { name: 'Next videos' }).first();
    const previousVideos = homepage.page.getByRole('button', { name: 'Previous videos' }).first();
    await nextVideos.click();
    await previousVideos.click();
    await expect(homepage.page).toHaveURL(/^https:\/\/www\.news18\.com\/?$/);
  });
});
