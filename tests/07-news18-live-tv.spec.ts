import { expect, test } from '../fixtures/news18.fixture';

test.describe('News18 Homepage', () => {
  test('Live TV homepage entry and recovery', async ({ homepage }) => {
    // 1. Load the homepage and open Watch LIVE TV.
    await homepage.goto();
    await homepage.page.getByRole('link', { name: 'Watch LIVE TV' }).click();

    // 2. Verify Live TV destination, then recover to the homepage.
    await expect(homepage.page).toHaveURL(/\/livetv\//);
    await expect(homepage.page).toHaveTitle(/News18.*LIVE TV/i);
    await homepage.goto();
    await expect(homepage.topNewsHeading).toBeVisible();
  });
});
