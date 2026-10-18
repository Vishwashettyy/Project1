import { expect, test } from '../../fixtures/news18.fixture';

test.describe('News18 Latest News Category Page', () => {
  test('Pagination boundary and invalid page routes', async ({ latestNews }) => {
    // 1. Verify page 1 pagination stays within the Latest News category.
    await latestNews.goto();
    await latestNews.scrollToPagination();
    const pageLinks = latestNews.paginationLinks;
    await expect(pageLinks.first()).toHaveAttribute('href', /\/news\/?$/);
    const offeredPageCount = await pageLinks.count();
    expect(offeredPageCount).toBeGreaterThan(1);

    // 2. Open the last offered page and verify its route is still inside the category.
    const lastPage = pageLinks.last();
    const lastPageHref = await lastPage.getAttribute('href');
    expect(lastPageHref).toMatch(/^\/news\/page-\d+\/$/);
    const lastPageNumber = Number(await lastPage.innerText());
    await lastPage.click();
    await expect(latestNews.page).toHaveURL(/\/news\/page-\d+\/?/);
    await expect(latestNews.categoryHeading).toBeVisible();
    await expect(
      latestNews.mainContent.locator(`a[href="/news/page-${lastPageNumber + 1}/"]`),
    ).toHaveCount(0);

    // 3. Open a safe out-of-range route and recover to the category root.
    const response = await latestNews.page.goto('https://www.news18.com/news/page-999999/');
    expect(response?.status() ?? 0).toBeLessThan(500);
    await expect(latestNews.page.locator('body')).toHaveText(/.+/);
    await latestNews.goto();
    await expect(latestNews.categoryHeading).toBeVisible();
  });
});
