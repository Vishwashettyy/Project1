import { expect, test } from '../../fixtures/news18.fixture';

test.describe('News18 Latest News Category Page', () => {
  test('Advertisements and prompts do not block category use', async ({ latestNews }) => {
    // 1. Load the category page and note whether an accessible prompt is shown.
    await latestNews.goto();
    const prompt = latestNews.page.getByRole('dialog');
    if (await prompt.count()) {
      const dismissButton = prompt.getByRole('button', { name: /close|dismiss|not now/i });
      if (await dismissButton.count()) {
        await dismissButton.click();
      }
    }

    // 2. Verify the category list and pagination remain usable after handling prompts.
    await expect(latestNews.categoryHeading).toBeVisible();
    await expect(latestNews.storyLinks.first()).toBeVisible();
    await latestNews.scrollToPagination();
    await expect(latestNews.paginationLinks.first()).toBeVisible();
  });
});
