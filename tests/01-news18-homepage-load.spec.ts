import { expect, test } from '../fixtures/news18.fixture';

test.describe('News18 Homepage', () => {
  test('Homepage load, identity, and initial viewport', async ({ homepage }) => {
    // 1.1.1 Navigate directly to News18 and verify the primary homepage content is available.
    await homepage.goto();
    await expect(homepage.page).toHaveURL(/^https:\/\/www\.news18\.com\/?$/);
    await expect(homepage.page).toHaveTitle(/News18/i);
    await expect(homepage.topNewsHeading).toBeVisible();

    // 1.1.2 Verify the edition and primary homepage areas are visible in the initial desktop viewport.
    await expect(homepage.englishEdition).toBeVisible();
    await expect(homepage.header).toBeVisible();
    await expect(homepage.primaryNavigation).toBeVisible();
    await expect(homepage.topNewsHeading).toBeVisible();
    await expect(homepage.mainContent).toBeVisible();
  });
});
