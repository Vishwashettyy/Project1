import { expect, test } from '../../fixtures/news18.fixture';

test.describe('News18 Photo Gallery Landing Page', () => {
  test('Photo Gallery page direct load and initial viewport', async ({ photoGallery }) => {
    await photoGallery.goto();

    await expect(photoGallery.page).toHaveURL(/^https:\/\/www\.news18\.com\/photogallery\/?$/);
    await expect(photoGallery.page).toHaveTitle(/photo gallery.*news18/i);
    await expect(photoGallery.pageHeading).toBeVisible();
    await expect(photoGallery.description).toBeVisible();
    await expect(photoGallery.header).toBeVisible();
    await expect(photoGallery.primaryNavigation).toBeVisible();
    await expect(photoGallery.categoryLinks.first()).toBeVisible();
    await expect(photoGallery.galleryCards.first()).toBeVisible();
  });
});
