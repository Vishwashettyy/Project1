import { expect, test } from '../../fixtures/news18.fixture';
import type { Route } from '@playwright/test';

test.describe('News18 Photo Gallery Landing Page', () => {
  test('Page errors are observed and the gallery recovers after a failed request', async ({
    photoGallery,
  }) => {
    const pageErrors: string[] = [];
    photoGallery.page.on('pageerror', (error) => pageErrors.push(error.message));
    await photoGallery.goto();
    await expect(photoGallery.pageHeading).toBeVisible();
    await expect(photoGallery.galleryCards.first()).toBeVisible();

    let documentRequestFailed = false;
    const failOneDocument = async (route: Route): Promise<void> => {
      if (!documentRequestFailed && route.request().resourceType() === 'document') {
        documentRequestFailed = true;
        await route.fulfill({
          status: 503,
          contentType: 'text/html',
          body: '<title>Service unavailable</title>',
        });
        return;
      }
      await route.continue();
    };
    await photoGallery.page.route('**/photogallery/**', failOneDocument);
    try {
      const failedResponse = await photoGallery.page.reload();
      expect(failedResponse?.status()).toBe(503);
    } finally {
      await photoGallery.page.unroute('**/photogallery/**', failOneDocument);
    }

    await photoGallery.goto();
    await expect(photoGallery.pageHeading).toBeVisible();
    await expect(photoGallery.galleryCards.first()).toBeVisible();
    expect(documentRequestFailed).toBe(true);
    expect(pageErrors).toEqual([]);
  });
});
