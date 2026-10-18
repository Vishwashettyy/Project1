import { expect, test } from '../../fixtures/news18.fixture';

test.describe('News18 Latest News Category Page', () => {
  test('Global search from Latest News page', async ({ latestNews }) => {
    // 1. Open Ask News18 search from the category page header.
    await latestNews.goto();
    await latestNews.askNews18Trigger.click();
    const searchInput = latestNews.page.getByRole('textbox', {
      name: 'Search News, Videos, Photos and More',
    });
    await expect(searchInput).toBeVisible();

    // 2. Submit a harmless query and verify the category page remains recoverable.
    await searchInput.fill('latest India news');
    await searchInput.press('Enter');
    await expect(latestNews.page).toHaveURL(/news18\.com/);
    await latestNews.goto();
    await expect(latestNews.categoryHeading).toBeVisible();
  });
});
