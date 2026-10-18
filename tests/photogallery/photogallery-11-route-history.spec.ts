import { expect, test } from '../../fixtures/news18.fixture';

test.describe('News18 Photo Gallery Landing Page', () => {
  test('Direct route, reload, and browser history preserve page identity', async ({ photoGallery }) => {
    await photoGallery.goto();
    await expect(photoGallery.page).toHaveURL(/\/photogallery\/?$/);
    await expect(photoGallery.pageHeading).toBeVisible();
    const initialTitle = await photoGallery.page.title();

    await photoGallery.reload();
    await expect(photoGallery.page).toHaveURL(/\/photogallery\/?$/);
    await expect(photoGallery.pageHeading).toBeVisible();
    await expect(photoGallery.page).toHaveTitle(initialTitle);

    const category = photoGallery.categoryLinks.filter({ hasText: /^Movies$/i }).first();
    await expect(category).toBeVisible();
    await category.click();
    await photoGallery.page.goBack();
    await expect(photoGallery.pageHeading).toBeVisible();
    await photoGallery.page.goForward();
    await expect(photoGallery.page.locator('main')).toBeVisible();
  });
});
