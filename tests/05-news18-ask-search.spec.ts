import { expect, test } from '../fixtures/news18.fixture';

test.describe('News18 Homepage', () => {
  test('Ask News18 search overlay and query flow', async ({ homepage }) => {
    // 1. Load the homepage and open Ask News18 search.
    await homepage.goto();
    await homepage.page.getByText('ask news18', { exact: true }).click();
    const searchInput = homepage.page.getByRole('textbox', {
      name: 'Search News, Videos, Photos and More',
    });
    await expect(searchInput).toBeVisible();

    // 2. Submit a harmless topical query and verify the site remains usable.
    await searchInput.fill('latest India news');
    await searchInput.press('Enter');
    await expect(homepage.page).toHaveURL(/news18\.com/);
    await expect(homepage.page).toHaveTitle(/News18/i);

    // 3. Return to the homepage and verify its primary content remains available.
    await homepage.goto();
    await expect(homepage.topNewsHeading).toBeVisible();
  });
});
