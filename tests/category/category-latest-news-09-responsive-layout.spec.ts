import { expect, test } from '../../fixtures/news18.fixture';

test.describe('News18 Latest News Category Page', () => {
  test('Responsive category page layout', async ({ latestNews }) => {
    // 1. Verify the category identity and lead content at desktop, tablet, and mobile sizes.
    await latestNews.goto();
    for (const viewport of [
      { width: 1280, height: 800 },
      { width: 768, height: 1024 },
      { width: 390, height: 844 },
    ]) {
      await latestNews.page.setViewportSize(viewport);
      await expect(latestNews.header).toBeVisible();
      await expect(latestNews.categoryHeading).toBeVisible();
      await expect(latestNews.storyLinks.first()).toBeVisible();
      const hasHorizontalOverflow = await latestNews.page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
      );
      expect(hasHorizontalOverflow).toBe(false);
    }

    // 2. Ensure mobile category navigation and pagination remain available when displayed.
    await latestNews.page.setViewportSize({ width: 390, height: 844 });
    await expect(latestNews.categoryHeading).toBeVisible();
    await latestNews.scrollToPagination();
    await expect(latestNews.paginationLinks.first()).toBeVisible();
  });
});
