import { expect, test } from '../../fixtures/news18.fixture';

test.describe('News18 Photo Gallery Landing Page', () => {
  test('Gallery layout reflows across desktop, tablet, and mobile widths', async ({ photoGallery }) => {
    await photoGallery.goto();

    for (const viewport of [
      { width: 1440, height: 900 },
      { width: 768, height: 1024 },
      { width: 375, height: 812 },
    ]) {
      await photoGallery.page.setViewportSize(viewport);
      await expect(photoGallery.pageHeading).toBeVisible();
      await expect(photoGallery.categoryLinks.first()).toBeVisible();
      await expect(photoGallery.galleryCards.first()).toBeVisible();
      const horizontalOverflow = await photoGallery.page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
      );
      expect(horizontalOverflow).toBe(false);
    }

    await photoGallery.page.setViewportSize({ width: 375, height: 812 });
    await photoGallery.page.setViewportSize({ width: 1440, height: 900 });
    await expect(photoGallery.pageHeading).toBeVisible();
    await photoGallery.categoryLinks.filter({ hasText: /^Movies$/i }).click();
    await expect(photoGallery.page).toHaveURL(/\/photogallery\/movies\/?$/);
    await photoGallery.page.goBack();
    await expect(photoGallery.pageHeading).toBeVisible();
  });
});
