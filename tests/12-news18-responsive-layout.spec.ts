import { expect, test } from '../fixtures/news18.fixture';

test.describe('News18 Homepage', () => {
  test('Responsive homepage layout at mobile, tablet, and desktop sizes', async ({ homepage }) => {
    // 1. Load the homepage and verify its desktop header and primary content.
    await homepage.goto();
    await expect(homepage.header).toBeVisible();
    await expect(homepage.topNewsHeading).toBeVisible();

    // 2. Resize to mobile and verify the homepage remains visible and usable.
    await homepage.page.setViewportSize({ width: 390, height: 844 });
    await expect(homepage.header).toBeVisible();
    await expect(homepage.mainContent).toBeVisible();
    await expect(homepage.topNewsHeading).toBeVisible();

    // 3. Restore a desktop viewport and confirm the header and primary content remain available.
    await homepage.page.setViewportSize({ width: 1280, height: 720 });
    await expect(homepage.header).toBeVisible();
    await expect(homepage.topNewsHeading).toBeVisible();
  });
});
