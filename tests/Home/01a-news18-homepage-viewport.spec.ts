import { expect, test } from '../../fixtures/news18.fixture';

test.describe('News18 Homepage', () => {
  test('Homepage load, identity, and initial viewport', async ({ homepage }) => {
    // 1. Navigate directly to News18 and verify the English homepage content is available.
    await homepage.goto();
    await expect(homepage.page).toHaveURL(/^https:\/\/www\.news18\.com\/?$/);
    await expect(homepage.page).toHaveTitle(/News18/i);
    await expect(homepage.topNewsHeading).toBeVisible();

    // 2. Verify the edition, primary navigation, and lead content are visible in the desktop viewport.
    await expect(homepage.englishEdition).toBeVisible();
    await expect(homepage.header).toBeVisible();
    await expect(homepage.primaryNavigation).toBeInViewport();
    await expect(homepage.topNewsHeading).toBeInViewport();
    await expect(homepage.mainContent).toBeVisible();
  });
});
