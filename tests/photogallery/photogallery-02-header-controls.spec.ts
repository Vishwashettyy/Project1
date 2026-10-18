import { expect, test } from '../../fixtures/news18.fixture';

test.describe('News18 Photo Gallery Landing Page', () => {
  test('Header controls are named and provide a safe return path', async ({ photoGallery }) => {
    await photoGallery.goto();

    const logo = photoGallery.header.getByRole('link').filter({
      has: photoGallery.header.locator('img'),
    }).first();
    await expect(logo).toHaveAttribute('href', /^https:\/\/www\.news18\.com\/?$/);
    await expect(photoGallery.header.getByRole('link', { name: /join us/i })).toHaveAttribute(
      'href',
      /.+/,
    );

    const askNews18 = photoGallery.header.getByText(/ask news18/i).first();
    const signIn = photoGallery.header.getByText(/sign in/i).first();
    await expect(askNews18).toBeVisible();
    await expect(signIn).toBeVisible();

    await askNews18.click({ noWaitAfter: true });
    await photoGallery.page.keyboard.press('Escape');
    if (!photoGallery.page.url().includes('/photogallery/')) {
      await photoGallery.goto();
    }
    await expect(photoGallery.pageHeading).toBeVisible();

    await signIn.click({ noWaitAfter: true });
    await photoGallery.page.keyboard.press('Escape');
    if (!photoGallery.page.url().includes('/photogallery/')) {
      await photoGallery.goto();
    }
    await expect(photoGallery.pageHeading).toBeVisible();
  });
});
