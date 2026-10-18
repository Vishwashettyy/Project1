# News18 Latest News Category Page Test Plan

## Application Overview

Comprehensive functional, navigation, pagination, content, responsive, accessibility, and resilience coverage for the News18 Latest News category page at https://www.news18.com/news/. The live page has a Latest News title and intro, lead stories, a Latest News list, page-number pagination (pages 1–5 observed during inspection), and supporting Web Stories, Videos, and Photogalleries modules. Headlines and module content are dynamic, so tests should verify structure, relevance, and link behavior rather than fixed article text. Each test assumes a fresh browser session unless a scenario explicitly requires navigation or persistence.

## Test Scenarios

### 1. News18 Latest News Category Page

**Seed:** `tests\seed.spec.ts`

#### 1.1. Latest News page direct load and identity

**File:** `tests\category\category-latest-news-01-page-load.spec.ts`

**Steps:**
  1. In a fresh browser session, navigate directly to https://www.news18.com/news/ and wait for the page heading and primary story content using web-first assertions.
    - expect: The URL uses HTTPS and resolves to the Latest News category route.
    - expect: The document title identifies the Latest News page and News18.
    - expect: A visible Latest News page heading and introductory description are presented.
    - expect: The primary content region contains usable story content and does not remain indefinitely loading.
  2. Inspect the initial viewport for the site header, global navigation, category title, and lead story content.
    - expect: Header navigation and category identity are visible and distinguishable.
    - expect: Lead content is not hidden behind a blocking overlay or clipped at the desktop viewport.
    - expect: Any visible prompt has usable controls and does not block all category content.

#### 1.2. Global navigation and breadcrumb behavior

**File:** `tests\category\category-latest-news-02-header-navigation.spec.ts`

**Steps:**
  1. From the Latest News page, inspect the global navigation and open a top-level section such as India or World; return to Latest News using browser history or the global navigation.
    - expect: Visible navigation links have meaningful labels and lead to corresponding News18 sections.
    - expect: The Latest News route can be revisited and remains usable after navigation.
  2. Use the page breadcrumb or Home link to return to the News18 homepage, then navigate back to Latest News.
    - expect: The breadcrumb/home control leads to the expected destination.
    - expect: Back/forward navigation preserves usable pages without a blank or stuck state.

#### 1.3. Lead story cards and article navigation

**File:** `tests\category\category-latest-news-03-lead-stories.spec.ts`

**Steps:**
  1. Identify the currently displayed lead stories near the top of the Latest News page and open several story cards without relying on fixed headline text.
    - expect: Each selected story card is clickable and has a non-empty destination.
    - expect: The destination is an article or another clearly relevant News18 content page.
    - expect: The article headline/content corresponds to the selected card.
  2. Return to the category page after visiting a lead story.
    - expect: Browser Back or the category navigation returns to the Latest News listing.
    - expect: The category heading and story list are available after returning.

#### 1.4. Latest News article list content and links

**File:** `tests\category\category-latest-news-04-story-list.spec.ts`

**Steps:**
  1. Scroll to the Latest News feed and inspect several currently displayed rows/cards, including any visible story image, headline, summary, timestamp, or attribution.
    - expect: The list contains multiple stories with readable, non-empty headlines.
    - expect: Story information is laid out consistently; optional summaries, timestamps, or images do not cause broken or overlapping content.
    - expect: Story links lead to their corresponding articles or relevant content destinations.
  2. Open one item from the Latest News feed and return to the category page.
    - expect: The selected story opens successfully and is relevant to its displayed headline.
    - expect: The user can return to the feed and continue browsing.

#### 1.5. Pagination across Latest News pages

**File:** `tests\category\category-latest-news-05-pagination.spec.ts`

**Steps:**
  1. Locate pagination controls at the end of the category feed and record the currently selected page and available page links.
    - expect: Pagination controls are visible and operable when additional pages exist.
    - expect: Page numbers are distinguishable and their destinations remain within the Latest News category.
    - expect: Current page state is visually or accessibly identifiable.
  2. Open page 2 using its pagination control and inspect the resulting route, page heading/title, and story list.
    - expect: The route changes to the second category page (for example /news/page-2/).
    - expect: The title or page heading identifies the paginated Latest News view.
    - expect: A story list is displayed and is not simply a broken or empty page.
  3. Navigate back to page 1, then open another available page and return using pagination or browser history.
    - expect: Page 1 returns to the root /news/ route.
    - expect: Pagination between available pages works consistently and browser history remains usable.
    - expect: Page content updates to the destination page without asserting fixed headlines.

#### 1.6. Pagination boundary and invalid page routes

**File:** `tests\category\category-latest-news-06-pagination-boundaries.spec.ts`

**Steps:**
  1. On page 1 and the last page offered by pagination, inspect whether previous/next controls are present or disabled at the respective boundaries.
    - expect: Pagination does not link to a page below page 1 or beyond the last available page.
    - expect: Boundary controls are hidden, disabled, or otherwise clearly non-actionable where movement is unavailable.
  2. Open a safe malformed or out-of-range category page URL under /news/ and inspect the result.
    - expect: The route returns an understandable not-found, empty, or graceful fallback state.
    - expect: The page does not expose internal error diagnostics or remain indefinitely loading.
  3. Recover to the category root using a page link, breadcrumb, or browser Back.
    - expect: Recovery returns to a functional Latest News page.

#### 1.7. Web Stories, Videos, and Photogalleries modules

**File:** `tests\category\category-latest-news-07-supporting-modules.spec.ts`

**Steps:**
  1. Scroll through the category page and locate supporting modules such as Web Stories, Videos, and Photogalleries, noting which are present at execution time.
    - expect: Present modules have clear section headings and content links.
    - expect: Optional modules may be marked not applicable when absent; their absence does not fail the category page test.
  2. Open a representative item and any visible View More link for each available module, then return to Latest News.
    - expect: Module items link to relevant web story, video, gallery, or listing destinations.
    - expect: The category page remains recoverable after leaving a supporting module.

#### 1.8. Direct route, refresh, and browser history

**File:** `tests\category\category-latest-news-08-refresh-direct-route.spec.ts`

**Steps:**
  1. Load /news/ directly, refresh it, and verify category identity and story content remain available.
    - expect: Direct navigation and refresh render the category page correctly.
    - expect: The title and category heading remain consistent with the Latest News route.
  2. Open /news/page-2/ directly if the page is offered by pagination, refresh, then use browser Back and Forward.
    - expect: The paginated route remains accessible directly and on refresh.
    - expect: Browser history moves between the category routes and the content corresponds to the current route.

#### 1.9. Responsive category page layout

**File:** `tests\category\category-latest-news-09-responsive-layout.spec.ts`

**Steps:**
  1. Inspect the Latest News root page at desktop, tablet, and narrow mobile viewport widths.
    - expect: Header, category heading, lead stories, and article list reflow to the viewport.
    - expect: Text and key controls remain readable and usable without unintended horizontal scrolling.
    - expect: Cards and images do not overlap or obscure story headlines.
  2. At mobile width, use visible navigation and pagination controls and open a story card.
    - expect: Controls remain tappable and reachable; navigation adapts appropriately for mobile.
    - expect: Pagination and story links work without requiring desktop-only hover behavior.

#### 1.10. Keyboard navigation and accessibility

**File:** `tests\category\category-latest-news-10-keyboard-accessibility.spec.ts`

**Steps:**
  1. Use Tab and Shift+Tab to navigate from the page header through category controls, story links, pagination, and footer links.
    - expect: Focus is visible and follows a reasonable order.
    - expect: Important links and pagination controls can be activated with the keyboard.
    - expect: Focus is not unexpectedly trapped in a menu, prompt, or embedded module.
  2. Inspect heading hierarchy and accessible names for the category title, story links, pagination, and image links.
    - expect: The page exposes a clear category heading and meaningful accessible names for interactive content.
    - expect: Decorative images do not create confusing unlabeled controls.

#### 1.11. Global search from Latest News page

**File:** `tests\category\category-latest-news-11-global-search.spec.ts`

**Steps:**
  1. Open the global Ask News18/search control from the category page header and inspect its search input and suggestions if present.
    - expect: The search interface opens without unintentionally losing the category page route.
    - expect: The input has an understandable accessible label and can be dismissed.
  2. Submit a harmless topical query and then return to the Latest News page.
    - expect: Search produces results, a clear empty state, or a clear error state without hanging.
    - expect: The user can return to the category page and continue browsing.

#### 1.12. Advertisements and prompts do not block category use

**File:** `tests\category\category-latest-news-12-ads-prompts.spec.ts`

**Steps:**
  1. Load the category page in a fresh session and note any consent, privacy, promotional, or advertising overlays.
    - expect: If no prompt is present, record the scenario as not applicable for the run.
    - expect: Visible prompts offer understandable actions and do not permanently block the category list.
    - expect: Advertising and third-party content do not cover essential navigation or story controls.
  2. If a safe dismiss option is available, dismiss the prompt and continue to browse the story list and pagination.
    - expect: The prompt closes and category content remains usable.
    - expect: Third-party rendering failures are distinguished from first-party page defects.

#### 1.13. Slow and interrupted loading resilience

**File:** `tests\category\category-latest-news-13-load-resilience.spec.ts`

**Steps:**
  1. Using approved browser/network test tooling, throttle the connection while loading /news/ and observe the header, title, and first stories.
    - expect: The page presents usable primary content when available or provides a clear loading/failure state.
    - expect: The route does not remain indefinitely blocked without feedback.
  2. If practical, block one nonessential image or third-party ad request and continue using the page navigation and story links.
    - expect: Failure of an optional resource does not disable pagination or unrelated story links.
    - expect: Missing images or ad content do not collapse the layout or obscure headlines.
