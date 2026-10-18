import { expect, test } from '../../fixtures/news18.fixture';

test.describe('News18 Latest News Category Page', () => {
  test('Pagination across Latest News pages', async ({ latestNews }) => {
    // 1. Locate the category pagination and verify multiple numbered pages are available.
    await latestNews.goto();
    await latestNews.scrollToPagination();
    const pageTwo = latestNews.paginationLinks.getByText('2', { exact: true });
    await expect(pageTwo).toBeVisible();

    // 2. Open page 2 and verify the paginated category route and story content.
    await pageTwo.click();
    await expect(latestNews.page).toHaveURL(/\/news\/page-2\/?/);
    await expect(latestNews.page).toHaveTitle(/Page-2.*Latest News/i);
    await expect(latestNews.categoryHeading).toBeVisible();
    await expect(latestNews.storyLinks.first()).toBeVisible();

    // 3. Return to page 1 and visit another available page.
    await latestNews.paginationLinks.getByText('1', { exact: true }).click();
    await expect(latestNews.page).toHaveURL(/^https:\/\/www\.news18\.com\/news\/?$/);
    const pageThree = latestNews.paginationLinks.getByText('3', { exact: true });
    await expect(pageThree).toBeVisible();
    await pageThree.click();
    await expect(latestNews.page).toHaveURL(/\/news\/page-3\/?/);
    await expect(latestNews.categoryHeading).toBeVisible();
  });
});
