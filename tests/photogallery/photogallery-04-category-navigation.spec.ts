import { expect, test } from '../../fixtures/news18.fixture';

test.describe('News18 Photo Gallery Landing Page', () => {
  test('Breadcrumb and rendered gallery categories navigate correctly', async ({ photoGallery }) => {
    await photoGallery.goto();

    if (await photoGallery.breadcrumb.count()) {
      await expect(photoGallery.breadcrumb).toHaveAttribute(
        'href',
        /^(?:\/|https:\/\/www\.news18\.com\/?)$/,
      );
      await photoGallery.breadcrumb.click();
      await expect(photoGallery.page).toHaveURL(/^https:\/\/www\.news18\.com\/?$/);
      await photoGallery.goto();
      await expect(photoGallery.pageHeading).toBeVisible();
    }

    const categories = photoGallery.categoryLinks;
    const categoryCount = await categories.count();
    expect(categoryCount).toBeGreaterThan(0);

    for (let index = 0; index < categoryCount; index += 1) {
      await photoGallery.goto();
      const category = photoGallery.categoryLinks.nth(index);
      const label = (await category.innerText()).trim();
      const destination = await category.getAttribute('href');
      expect(destination).toBeTruthy();
      await category.click();

      if (label.toLowerCase() === 'all') {
        await expect(photoGallery.page).toHaveURL(/\/photogallery\/?$/);
      } else {
        const expectedUrl = new URL(destination!, 'https://www.news18.com').href;
        await expect(photoGallery.page).toHaveURL(expectedUrl);
        await expect(photoGallery.page.locator('main')).toBeVisible();
      }
    }

    await photoGallery.page.goBack();
    await expect(photoGallery.pageHeading).toBeVisible();
    await photoGallery.page.goForward();
    await expect(photoGallery.page.locator('main')).toBeVisible();
  });
});
