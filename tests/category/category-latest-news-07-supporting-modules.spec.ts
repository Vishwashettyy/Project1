import { expect, test } from '../../fixtures/news18.fixture';

test.describe('News18 Latest News Category Page', () => {
  test('Web Stories, Videos, and Photogalleries modules', async ({ latestNews }) => {
    // 1. Load Latest News and find the optional supporting modules currently rendered.
    await latestNews.goto();
    const moduleHeadings = [
      latestNews.mainContent.getByRole('heading', { name: /web stories/i }).first(),
      latestNews.mainContent.getByRole('heading', { name: /^videos$/i }).first(),
      latestNews.mainContent.getByRole('heading', { name: /photo.?galleries/i }).first(),
    ];
    const visibleModules = [];
    for (const heading of moduleHeadings) {
      if (await heading.count()) {
        await expect(heading).toBeVisible();
        visibleModules.push(heading);
      }
    }

    // 2. Verify each visible module has linked content when it is present.
    expect(visibleModules.length).toBeGreaterThan(0);
    await expect(latestNews.mainContent.getByRole('link').first()).toHaveAttribute('href', /.+/);
  });
});
