# What the product pages need from the CMS

The site now builds a real product page for every hearing aid — who it suits, how
it sits in the ear, what the price covers, a spec table, related devices, and a
set of questions answered per model. Everything on that page is generated from
the API, so anything the API does not carry has to be guessed from the model
name, and a guess about a medical device is worth less than a blank.

This is the list, in order of what it would change.

---

## 0. Fix first: the production API URL

`.env.production` pointed at `https://admin.sensohearingdhaka.com/`. That is the
accounting system, not the website CMS: 311 SKUs, 117 of them accessories, 284
with no price at all, and image paths that resolve to a bare `/storage/`. The
trailing slash also made every request `https://admin…//api/senso/…`, which
redirects to the admin login page and returns HTML.

The result was that every product fetch returned a login page, the catalogue came
back empty, and no product pages were built at all — the whole site looked broken
with nothing in the build log to say why.

Now set to `https://cloud.sensohearingdhaka.com`, with no trailing slash, and the
code strips trailing slashes anyway. `generateStaticParams` now fails the build
loudly if the catalogue comes back empty, rather than quietly shipping 404s.

**The website reads `cloud.` — never `admin.`.**

---

## 1. Fitting range — the single highest-value field

54 of the 109 products carry `Fitting Range: 20-110` in their features, and the
detail endpoint repeats it as `coverage: "20-110dB"`. The page reads it, converts
it to the degrees of loss a patient is actually told they have, draws the scale
from it, and prints ReSound's own number underneath.

The other 55 products have no fitting range, so the page falls back to inferring
one from the model name — usable, but not quotable.

**Ask: fill `Fitting Range` on the remaining 55 products.** It is the difference
between "this device is for you" being a fact and being an estimate.

Ideally as two numbers rather than a string:

| Field | Type | Example |
|---|---|---|
| `fitting_range_from_db` | integer | `20` |
| `fitting_range_to_db` | integer | `110` |

---

## 2. Fields currently guessed from the model name

The page parses `"Resound Nexia 461 DRWC RIE"` for these. Every one of them
should be a column instead.

| Field | Type | Values | Guessed from |
|---|---|---|---|
| `form_factor` | enum | `rie` `bte` `cic` `itc` `ite` | the RIE/BTE token in the name |
| `power_class` | enum | `standard` `power` `superpower` | an SP/UP/HP token |
| `battery` | enum | `rechargeable` `size_312` `size_13` `size_675` | the DRWC/DRW suffix |
| `tier` | enum | `entry` `mid` `premium` | a hard-coded map of series names |
| `is_accessory` | boolean | | the series being named "Hearign Aid Battery" |

`is_accessory` matters more than it looks: without it a ৳300 battery sits in the
same list as the hearing aids and drags the "prices from" figure — and the price
range Google shows in search results — down to ৳300.

While you are in there: the series **"Hearign Aid Battery"** is misspelled in the
CMS. The code matches the misspelling on purpose; fix it in the CMS and tell us,
and we will change the code in the same release.

---

## 3. Fields that would let the page say more

| Field | Type | Why |
|---|---|---|
| `channels` | integer | Already in the features as free text ("No of Channels 12"). As a number it becomes comparable between models. |
| `short_description` | text, one sentence, Bangla | What this model is for, in a sentence a patient would say. The current descriptions are ReSound's English marketing copy. |
| `warranty_years` | integer | `warranty` is free text ("2 Year Warranty"). |
| `status` / `is_published` | boolean | Nothing currently marks a discontinued model, so old stock stays indexed forever. |
| `sort_order` | integer | Series order is alphabetical today, which puts ENZO Q above Nexia. |

---

## 4. Two endpoint problems

**`/products/series` returns 40 rows where `/products/list` returns 109.** The
category page used to call it and was silently hiding two thirds of the
catalogue, whole series included. The site now filters the full list in memory
instead. Worth fixing at the source anyway.

**Images 403 the Next.js image optimiser** on hotlinked fetches, so images are
served unoptimised for now. Allowing the optimiser through would cut the weight
of every product grid substantially — which on Bangladeshi mobile data is the
slowest thing on the page.

---

## 5. Bangla

Everything the visitor reads exists in Bangla and English, but all of it is
written in the site, not in the CMS. If Senso wants to write product copy
themselves, the fields that need a Bangla twin are `name`, `description`,
`short_description`, `features[].value` and `contents[].title` / `.content`.
Until then the English CMS text sits inside a Bangla page, which is the one
seam still visible on these pages.
