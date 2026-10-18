import { expect, test } from '../../fixtures/news18.fixture';

test.describe('News18 Photo Gallery Landing Page', () => {
  test('Long-page content and footer remain reachable after scrolling', async ({ photoGallery }) => {
    await photoGallery.goto();

    const initialScrollHeight = await photoGallery.page.evaluate(
      () => document.documentElement.scrollHeight,
    );
    await photoGallery.scrollToFooter();
    await expect(photoGallery.footer).toBeVisible();
    await expect(photoGallery.footer.getByRole('link').first()).toBeVisible();
    await photoGallery.page.evaluate(() => window.scrollTo(0, 0));
    await expect(photoGallery.pageHeading).toBeInViewport();

    await photoGallery.reload();
    await expect(photoGallery.pageHeading).toBeVisible();
    const reloadedScrollHeight = await photoGallery.page.evaluate(
      () => document.documentElement.scrollHeight,
    );
    expect(reloadedScrollHeight).toBeGreaterThan(0);
    expect(initialScrollHeight).toBeGreaterThan(0);
  });
});
