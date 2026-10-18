import { expect, test } from '../../fixtures/news18.fixture';

test.describe('News18 Photo Gallery Landing Page', () => {
  test('Page identity and editorial content remain valid after reload', async ({ photoGallery }) => {
    await photoGallery.goto();

    await expect(photoGallery.page).toHaveTitle(/photo gallery.*news18/i);
    await expect(photoGallery.pageHeading).toHaveText('Photo Gallery');
    await expect(photoGallery.description).toBeVisible();
    const firstHeadline = await photoGallery.galleryCards.first().getByRole('heading').innerText();
    expect(firstHeadline.trim().length).toBeGreaterThan(0);

    await photoGallery.reload();
    await expect(photoGallery.pageHeading).toBeVisible();
    await expect(photoGallery.galleryCards.first()).toBeVisible();
    await expect(photoGallery.galleryCards.first().getByRole('heading')).not.toHaveText('');
  });
});
