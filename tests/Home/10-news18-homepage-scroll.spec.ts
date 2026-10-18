import { expect, test } from '../../fixtures/news18.fixture';

test.describe('News18 Homepage', () => {
  test('Homepage scrolling and content sections', async ({ homepage }) => {
    // 1. Load homepage and verify the primary section.
    await homepage.goto();
    await expect(homepage.topNewsHeading).toBeVisible();

    // 2. Scroll to the end of the homepage and verify the footer is reachable.
    const footer = homepage.page.getByRole('contentinfo');
    await footer.scrollIntoViewIfNeeded();
    await expect(footer).toBeVisible();
  });
});
