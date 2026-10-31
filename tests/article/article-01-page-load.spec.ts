import { expect, test } from '../../fixtures/news18.fixture';

test.describe('News18 India Article', () => {
  test('Direct article load and page identity', async ({ article }) => {
    // 1. Navigate directly to the article and verify its route, identity, and readable content.
    await article.goto();
    await expect(article.page).toHaveURL(
      /^https:\/\/www\.news18\.com\/india\/tiger-shroff-firing-case-vlogger-umesh-chauhan-recounts-shooting-ws-l-10389825\.html$/,
    );
    await expect(article.page).toHaveTitle(/News18/i);
    await expect(article.pageHeading).toHaveCount(1);
    await expect(article.pageHeading).toBeVisible();
    await expect(article.pageHeading).toHaveText(/\S+/);
    await expect(article.summary).toBeVisible();
    await expect(article.summary).toHaveText(/\S+/);
    await expect(article.bodyParagraphs.first()).toBeVisible();
    await expect(article.bodyParagraphs.first()).toHaveText(/\S+/);

    // 2. Verify the initial viewport includes News18 branding, breadcrumb, metadata, and hero media.
    await expect(article.header).toBeVisible();
    await expect(article.news18Logo).toBeVisible();
    await expect(article.homeBreadcrumb).toBeVisible();
    await expect(article.indiaBreadcrumb).toBeVisible();
    await expect(article.pageHeading).toBeInViewport();
    await expect(article.publicationTime).toBeVisible();
    await expect(article.heroImage).toBeVisible();
    await expect(article.heroImage).toBeInViewport();
  });
});
