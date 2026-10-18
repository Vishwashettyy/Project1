import { expect, test } from '../../fixtures/news18.fixture';

test.describe('News18 Homepage', () => {
  test('Refresh, direct load, and invalid-path recovery', async ({ homepage }) => {
    // 1. Load the homepage directly, refresh, and verify the primary content.
    await homepage.goto();
    await expect(homepage.page).toHaveTitle(/News18/i);
    await expect(homepage.topNewsHeading).toBeVisible();
    await homepage.page.reload();
    await expect(homepage.topNewsHeading).toBeVisible();

    // 2. Visit a safe invalid path, verify the not-found result, then recover to homepage.
    await homepage.page.goto('https://www.news18.com/nonexistent-test-page-404-automation');
    await expect(homepage.page).toHaveTitle(/404|not found/i);
    await homepage.goto();
    await expect(homepage.topNewsHeading).toBeVisible();
  });
});
