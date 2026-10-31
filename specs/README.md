# Specs

This is a directory for test plans.

The News18 article plan covers the article detail page at the target URL and is documented in
[`news18-article-test-plan.md`](./news18-article-test-plan.md). Its suggested Playwright test files
are planning references; they are not implemented test files.

The Photo Gallery plan is implemented in `../tests/photogallery/` using the shared
News18 fixtures and page objects. Run it with:

```sh
npx playwright test tests/photogallery
```
