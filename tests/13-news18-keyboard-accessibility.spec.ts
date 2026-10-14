import { expect, test } from '../fixtures/news18.fixture';

test.describe('News18 Homepage', () => {
  test('Keyboard accessibility', async ({ homepage }) => {
    // 1. Load the homepage and move keyboard focus to the first available control.
    await homepage.goto();
    await homepage.page.keyboard.press('Tab');

    // 2. Verify primary navigation and Top News remain available during keyboard navigation.
    await expect(homepage.primaryNavigation).toBeVisible();
    await expect(homepage.topNewsHeading).toBeVisible();
  });
});
