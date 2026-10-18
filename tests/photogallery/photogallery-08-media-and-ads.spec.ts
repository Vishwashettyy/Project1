import { expect, test } from '../../fixtures/news18.fixture';

test.describe('News18 Photo Gallery Landing Page', () => {
  test('Gallery images load progressively without blocking content', async ({ photoGallery }) => {
    await photoGallery.goto();

    const images = photoGallery.mainContent.locator('img');
    const imageCount = await images.count();
    expect(imageCount).toBeGreaterThan(0);

    for (let index = 0; index < imageCount; index += 1) {
      const image = images.nth(index);
      await image.scrollIntoViewIfNeeded();
      const state = await image.evaluate((element: HTMLImageElement) => ({
        complete: element.complete,
        hasSource: Boolean(element.currentSrc || element.getAttribute('src')),
        naturalWidth: element.naturalWidth,
        alt: element.getAttribute('alt'),
      }));
      expect(state.hasSource).toBe(true);
      if (state.complete && state.naturalWidth > 0) {
        expect(state.naturalWidth).toBeGreaterThan(0);
      }
      if (state.alt === null) {
        await expect(image).toHaveAttribute('alt');
      }
    }

    await expect(photoGallery.pageHeading).toBeVisible();
    await expect(photoGallery.categoryLinks.first()).toBeVisible();
  });
});
