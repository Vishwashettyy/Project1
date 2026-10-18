import { expect, test } from '../../fixtures/news18.fixture';

test.describe('News18 Latest News Category Page', () => {
  test('Keyboard navigation and accessibility', async ({ latestNews }) => {
    // 1. Use keyboard navigation and verify focus reaches a visible interactive element.
    await latestNews.goto();
    await latestNews.page.keyboard.press('Tab');
    const focusedElement = latestNews.page.locator(':focus');
    await expect(focusedElement).toBeVisible();

    // 2. Verify category heading, story links, pagination, and footer expose usable structure.
    await expect(latestNews.categoryHeading).toBeVisible();
    await expect(latestNews.storyLinks.first()).toHaveAttribute('href', /.+/);
    await latestNews.scrollToPagination();
    await expect(latestNews.paginationLinks.first()).toBeVisible();
    await expect(latestNews.footer).toBeVisible();
  });
});
