import { expect, test } from '../../fixtures/news18.fixture';
import type { Route } from '@playwright/test';

test.describe('News18 Photo Gallery Landing Page', () => {
  test('Gallery content remains usable when a nonessential image fails', async ({ photoGallery }) => {
    let imageAborted = false;
    const abortOneImage = async (route: Route): Promise<void> => {
      if (!imageAborted && route.request().resourceType() === 'image') {
        imageAborted = true;
        await route.abort();
        return;
      }
      await route.continue();
    };

    await photoGallery.page.route('**/*', abortOneImage);
    try {
      await photoGallery.goto();
      await expect(photoGallery.pageHeading).toBeVisible();
      await expect(photoGallery.categoryLinks.first()).toBeVisible();
      expect(imageAborted).toBe(true);
    } finally {
      await photoGallery.page.unroute('**/*', abortOneImage);
    }
  });
});
