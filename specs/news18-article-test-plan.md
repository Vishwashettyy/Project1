# News18 Article Page Test Plan

## Application Overview

Comprehensive functional, content, navigation, responsive, accessibility, and resilience coverage for the News18 article at:

https://www.news18.com/india/tiger-shroff-firing-case-vlogger-umesh-chauhan-recounts-shooting-ws-l-10389825.html

The inspected page is a News18 India article with a breadcrumb, headline and summary, author and publication metadata, hero image, article body with section headings, an “At A Glance” summary, recommended stories, Quick Answers, author information, newsletter signup, comments entry, and supporting News18 modules. The article also includes third-party advertisements and embeds.

The observed headline was “‘Thought I Suffered A Heart Attack’: Vlogger Shot Near Tiger Shroff's Car Says Actor's Mother Assured Help.” Headlines, body copy, timestamps, related stories, advertisements, and embedded content may change or be updated. Validate the article identity and content structure without asserting fixed copy, exact story counts, ad content, or third-party availability. Treat any reporting about violence or injury neutrally and do not use the comments or newsletter flows to submit real personal information.

Each scenario assumes a fresh browser session unless it explicitly tests state, navigation, or persistence. A control or module that is not rendered in the current page/session should be recorded as not applicable rather than treated as a failure, unless the article's core reading experience is missing.

## Test Scenarios

### 1. News18 India Article

**Seed:** `tests\seed.spec.ts`

#### 1.1. Direct article load and page identity

**Suggested file:** `tests\article\article-01-page-load.spec.ts`

**Steps:**
1. In a fresh browser session, navigate directly to the article URL and wait for the page heading and primary article content to settle.
   - expect: The page loads over HTTPS and remains on the requested News18 article route.
   - expect: The document title identifies the article and News18.
   - expect: The page exposes one visible primary heading that identifies the article and a non-empty article summary or introduction.
   - expect: The article body becomes readable; the page does not remain indefinitely in a skeleton or loading state.
2. Inspect the initial desktop viewport, including the global header, breadcrumb, headline, metadata, and hero media.
   - expect: The article is visually distinguishable from advertisements, trending links, and other supporting content.
   - expect: Essential text and controls are not obscured by a blocking prompt or clipped at the viewport.
   - expect: Any visible prompt can be dismissed or does not prevent reading the article.

#### 1.2. Header, breadcrumb, and category navigation

**Suggested file:** `tests\article\article-02-navigation.spec.ts`

**Steps:**
1. Inspect the News18 logo, visible global navigation, and any header shortcuts (for example, Join Us, Ask News18, or Sign in).
   - expect: Each rendered control has a discernible accessible name and a usable action or destination.
   - expect: The logo leads to the News18 homepage; visible navigation links lead to destinations relevant to their labels.
   - expect: Opening and returning from a global destination does not lose the article route.
2. Activate the article breadcrumb links, including Home and India where available, then use browser Back and Forward.
   - expect: Each breadcrumb leads to its corresponding News18 destination.
   - expect: Browser history restores the article and category pages with matching URLs and page identities.
   - expect: Returning to the article leaves the main content available rather than blank or stale.
3. Inspect the Trending strip if displayed and open one topic relevant to the current page, then return.
   - expect: The topic link is operable and its destination is relevant to its label.
   - expect: The article remains recoverable through browser navigation.

#### 1.3. Headline, summary, byline, and publication metadata

**Suggested file:** `tests\article\article-03-article-metadata.spec.ts`

**Steps:**
1. Inspect the H1, summary/deck, author/byline, publisher attribution, last-updated timestamp, and first-published timestamp if present.
   - expect: The H1 is non-empty and identifies the article subject; the summary supports rather than contradicts the headline.
   - expect: Author and publisher labels are associated with their respective values and links.
   - expect: Displayed timestamps are readable and use a consistent, understandable date/time format.
   - expect: Optional metadata may be absent without leaving broken labels or placeholders.
2. Follow the author and publisher links, if rendered, and return to the article.
   - expect: Each link opens the corresponding byline or publisher page.
   - expect: Browser Back returns to the same article route and its primary content remains available.

#### 1.4. Hero image and media behavior

**Suggested file:** `tests\article\article-04-hero-media.spec.ts`

**Steps:**
1. Inspect the hero image or media frame and its caption/credit, if present.
   - expect: The media loads or presents a clear fallback if unavailable.
   - expect: An informative image has meaningful alternative text; decorative imagery is not announced as misleading content.
   - expect: A caption or credit, when provided, is readable and associated with the correct media.
2. If the hero image has an explicit zoom, gallery, or playback affordance, activate it and close/exit it using the provided control and Escape where supported.
   - expect: The affordance opens the intended media experience without triggering unrelated navigation.
   - expect: The media experience has an operable exit path and returns focus/reading position to a usable article state.
   - expect: If no media interaction is provided, record the interaction check as not applicable; do not treat an ordinary image click as required behavior.
3. If a video or other embedded media is present, test its available play/pause and mute controls without assuming that third-party playback is always available.
   - expect: Playback starts, shows a meaningful loading state, or reports an understandable unavailable state.
   - expect: A failed embed does not prevent reading the article or using unrelated controls.

#### 1.5. Article body structure and reading flow

**Suggested file:** `tests\article\article-05-body-content.spec.ts`

**Steps:**
1. Read from the summary through the end of the article body, including inline section headings, quotations, lists, and any “At A Glance” block present.
   - expect: Article text is present, readable, and grouped under a clear heading hierarchy.
   - expect: Paragraphs and quotations are not visibly truncated, overlapped, or duplicated in a way that impairs comprehension.
   - expect: Lists or summary points are presented as distinct items and remain associated with the correct section.
2. Scroll from the headline through the final article section and back to the top.
   - expect: The article can be read in sequence without an unexpected scroll trap or a persistent overlay blocking content.
   - expect: Sticky elements, if present, do not cover the currently read text or essential controls.
3. Verify that displayed summary/callout content is consistent with the article body at a high level.
   - expect: Summaries and callouts describe the same story and do not introduce obviously unrelated material.
   - expect: Editorial details may be revised; tests do not require a permanently fixed paragraph count or exact wording.

#### 1.6. In-article recommended story links

**Suggested file:** `tests\article\article-06-recommended-stories.spec.ts`

**Steps:**
1. Locate any Recommended Stories or inline story cards within the article.
   - expect: Each rendered card has readable link text and a non-empty destination.
   - expect: Card text, image, and destination remain associated with the same story.
   - expect: The card is relevant to the article topic, without requiring a fixed card count or headline.
2. Open one recommended story, record its destination, and return using browser Back.
   - expect: The destination is an appropriate News18 article or media page and loads without an unrelated error.
   - expect: Browser Back returns to the originating article and does not lose its page identity.

#### 1.7. “At A Glance” article summary

**Suggested file:** `tests\article\article-07-at-a-glance.spec.ts`

**Steps:**
1. Inspect the “At A Glance” or equivalent summary module when present.
   - expect: Its title is distinguishable from the body, and summary points are structured as separate items.
   - expect: Each displayed point is readable and relevant to the current article.
2. Navigate from the summary to the corresponding article sections if in-page anchors are provided.
   - expect: An anchor moves to the intended section and does not land behind a sticky header.
   - expect: If no in-page anchors are provided, record this check as not applicable.

#### 1.8. Quick Answers accordion

**Suggested file:** `tests\article\article-08-quick-answers.spec.ts`

**Steps:**
1. Locate Quick Answers and inspect its heading, question count/control, and initial state.
   - expect: The module is clearly identified and its question controls have discernible names and expanded/collapsed state.
   - expect: The initial state is usable whether answers are expanded or collapsed.
2. Expand each currently displayed question; collapse and reopen at least one answer.
   - expect: Each question reveals its corresponding answer, and the state is communicated accessibly.
   - expect: Expanding one answer does not make unrelated questions or the article unusable.
   - expect: Answer content is relevant to the article and does not appear as a broken or permanently loading placeholder.
3. Activate Ask News18 from the module if present; close/return without entering personal information.
   - expect: The control opens a relevant search/assistant experience or destination and has an operable return path.

#### 1.9. Author information and profile navigation

**Suggested file:** `tests\article\article-09-author-profile.spec.ts`

**Steps:**
1. Inspect the About the Author section, if rendered, including author name, profile image, biography, and external profile link.
   - expect: The section identifies the same author as the article byline when both are displayed.
   - expect: Images have appropriate alternative text and biography text is readable.
   - expect: Optional biography or profile details may be absent without broken placeholders.
2. Open the author profile link and any external social link separately, then return to the article.
   - expect: The author link leads to a relevant News18 author page.
   - expect: External destinations are identifiable as external and do not unexpectedly submit information.
   - expect: The article can be restored through browser history.

#### 1.10. Sharing and “preferred source” controls

**Suggested file:** `tests\article\article-10-sharing-controls.spec.ts`

**Steps:**
1. Inspect for share buttons, a copy-link action, or a “Choose News18 on Google”/preferred-source control.
   - expect: Any rendered control has a clear accessible name and an action matching its label.
   - expect: A copy-link action copies the current article URL; share actions target the current article.
   - expect: A preferred-source action opens a clearly identified external/browser flow or explains why it is unavailable.
2. Dismiss any opened share sheet or external prompt without completing account, device, or preference changes.
   - expect: The share/prompt UI can be dismissed and the article remains usable.
   - expect: If these controls are not available in the session, record the checks as not applicable.

#### 1.11. Comments entry and comments state

**Suggested file:** `tests\article\article-11-comments.spec.ts`

**Steps:**
1. Inspect the Add Your Comment control, comment disclaimer, terms/privacy links, and comments loading/empty/error state.
   - expect: The comment entry point and any visible policy text are readable and operable.
   - expect: Loading eventually resolves to comments, an empty state, sign-in requirement, or a clear failure state; it does not remain indefinitely loading.
   - expect: Terms and privacy links lead to the corresponding News18 policy pages.
2. Activate Add Your Comment and inspect the resulting form or sign-in gate without submitting a comment or credentials.
   - expect: Any form fields and required actions are clearly labeled and a safe close/cancel path is available.
   - expect: The user is not presented with a success state before a valid submission.
   - expect: Closing the form returns to a usable article and does not leave a blocking overlay.
3. Do not post test text publicly; use no real name, email, or account credentials.

#### 1.12. Newsletter form validation and privacy

**Suggested file:** `tests\article\article-12-newsletter.spec.ts`

**Steps:**
1. Locate the News18 Newsletter module and inspect its email field and submit control.
   - expect: The field has a clear accessible label and any consent/privacy disclosure is available where required.
   - expect: The module does not obscure article content or misrepresent the purpose of collecting an email address.
2. Submit the field empty and, if validation can be tested without subscribing, enter a clearly invalid synthetic address such as `not-an-email`.
   - expect: Invalid or empty input is rejected with understandable feedback and is not shown as successfully subscribed.
   - expect: Validation feedback is associated with the field and keyboard/screen-reader users can discover it.
3. Stop before submitting any valid email address; do not subscribe or provide personal data.

#### 1.13. Related content, sidebar, and supporting modules

**Suggested file:** `tests\article\article-13-supporting-modules.spec.ts`

**Steps:**
1. Scroll through the page and inspect supporting modules, such as Latest News, Rapid Read, Live TV, related stories, newsletter, advertisements, or the footer, where present.
   - expect: Each module has a discernible boundary or heading and its content links are operable.
   - expect: Supporting content remains distinguishable from the article body.
   - expect: Ad slots may be empty or unavailable; this does not fail the article unless they block essential use.
2. Open one relevant supporting News18 link and return to the article.
   - expect: The destination matches its link label and the article remains recoverable.
3. Verify that ad or embed failure does not disable the article, navigation, or unrelated modules.
   - expect: A blocked or unavailable third-party resource is isolated from first-party article content.

#### 1.14. Footer and global recovery

**Suggested file:** `tests\article\article-14-footer-navigation.spec.ts`

**Steps:**
1. Scroll to the bottom and inspect the footer links and any language/edition selector.
   - expect: Footer navigation is operable, readable, and grouped by purpose.
   - expect: Selecting a visible News18 destination or edition leads to a relevant route.
2. Return to the top using the browser or any visible Back to Top control.
   - expect: The page returns to the expected position without changing the article URL or losing core content.

#### 1.15. Responsive article layout

**Suggested file:** `tests\article\article-15-responsive-layout.spec.ts`

**Steps:**
1. Open the article at narrow mobile, tablet, and desktop viewport widths.
   - expect: The headline, metadata, body text, images, in-article modules, and navigation reflow without destructive overlap or clipping.
   - expect: Essential content does not require unintended horizontal scrolling.
   - expect: Images and embeds resize to fit their containers without obscuring captions or controls.
2. At mobile width, use the responsive navigation and at least one rendered in-article control (for example, a Quick Answer).
   - expect: Menus and controls open, close, and remain reachable at the narrow viewport.
   - expect: Touch targets are not hidden beneath sticky elements or prompts.
3. Resize between viewports while positioned mid-article.
   - expect: The user remains in the article and can continue reading without an unusable jump, overlap, or trapped layout.

#### 1.16. Keyboard accessibility and zoom

**Suggested file:** `tests\article\article-16-accessibility.spec.ts`

**Steps:**
1. Reload the article and traverse header controls, breadcrumbs, article links, media controls, accordions, forms, and footer links using Tab and Shift+Tab.
   - expect: Focus is visible and follows a predictable order.
   - expect: Interactive controls can be operated using keyboard-appropriate keys.
   - expect: Focus is not trapped in a menu, accordion, prompt, or form.
2. Operate one Quick Answers item and any dismissible overlay using keyboard alone.
   - expect: Expanded/collapsed or open/closed state is conveyed to assistive technology.
   - expect: Focus returns to a sensible location after the overlay is closed.
3. Increase browser zoom to 200% and inspect the headline, main body, and one supporting module.
   - expect: Text remains readable and primary content/controls remain available without substantial overlap or clipping.
4. Verify semantic landmarks and heading order.
   - expect: The page exposes a main/article landmark, a descriptive H1, and logically nested section headings.
   - expect: Form controls and meaningful images have accessible names/labels.

#### 1.17. Direct load, refresh, history, and scroll restoration

**Suggested file:** `tests\article\article-17-refresh-history.spec.ts`

**Steps:**
1. Load the article URL directly, refresh, and verify its primary identity and body content.
   - expect: Direct navigation and refresh continue to render the intended article over HTTPS.
   - expect: Refresh does not lead to a blank page, redirect loop, or unrelated route.
2. Navigate from the article to a breadcrumb or related story, then use Back and Forward.
   - expect: History restores the correct routes and the article remains readable.
   - expect: Scroll position is either sensibly restored or returned to a usable position.
3. Open a section anchor, if present, then reload that URL.
   - expect: A valid anchor deep link lands at the relevant section; otherwise record as not applicable.

#### 1.18. Invalid or unavailable article route recovery

**Suggested file:** `tests\article\article-18-invalid-route.spec.ts`

**Steps:**
1. Change a non-sensitive portion of the article path to a safe malformed or nonexistent News18 route and navigate to it.
   - expect: The site presents a clear not-found or graceful fallback state and does not expose internal diagnostics.
   - expect: The failure route does not misleadingly present unrelated article content under the requested URL.
2. Return to the valid article using browser Back or the News18 logo/home navigation.
   - expect: The valid article loads and its heading and body are available.

#### 1.19. Slow network and nonessential resource failure

**Suggested file:** `tests\article\article-19-resource-resilience.spec.ts`

**Steps:**
1. Using approved browser test tooling, throttle the connection and load the article; observe when the heading and first body paragraphs become usable.
   - expect: The page communicates loading and eventually renders readable first-party article content or a clear recoverable failure.
   - expect: The page does not remain indefinitely blocked without feedback.
2. If practical, block one nonessential ad, image, or third-party embed and continue reading and using navigation.
   - expect: Failure of the selected resource does not disable the article body or unrelated controls.
   - expect: Third-party resource failures are distinguished from first-party article failures.
3. Restore normal network conditions and reload.
   - expect: The article recovers to its standard usable state.

#### 1.20. Editorial freshness and content integrity

**Suggested file:** `tests\article\article-20-content-integrity.spec.ts`

**Steps:**
1. Verify the headline, summary, body, byline, and timestamps agree that the same article is being displayed.
   - expect: Article identity is consistent across the document title, H1, and main content.
   - expect: Author and timestamp metadata are not incorrectly attached to a separate story.
2. Refresh after a visible update or if metadata changes during the session.
   - expect: Updated metadata is displayed consistently after refresh.
   - expect: Tests do not fail solely because editorial copy, publication time, or related links were updated.
3. Treat article claims as editorial content; test page rendering and internal consistency rather than independently validating allegations or reporting accuracy.

## Execution Notes and Exit Criteria

- Run each scenario independently in a fresh browser context unless it explicitly tests navigation or state.
- Use web-first assertions and accessible roles/names where possible; avoid brittle selectors tied to dynamic headlines, ad markup, generated IDs, or fixed card counts.
- Record browser, viewport, route, observed prompt/ad/embed state, and any third-party limitation with failures.
- A scenario passes when its expected outcomes are met or an explicitly conditional interaction is recorded as not applicable. Third-party outages are not article failures unless they block core first-party reading or navigation.
- Prioritize failures that prevent direct article access, reading the headline/body, navigating safely, or using essential controls. Report cosmetic and optional-module issues separately.
