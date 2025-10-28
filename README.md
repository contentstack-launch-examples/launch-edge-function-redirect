# Launch Edge Function Redirect

A scalable approach to manage redirects using Next.js API routes and Launch Edge Functions.

## Overview

This project demonstrates how to implement dynamic redirects that can be managed through a CMS or defined statically, with cache control at the edge for optimal performance.

## Recommended Implementation

### 1. API Route (`pages/api/redirect.js`)

Create an API route that provides redirect rules. This route can:
- Fetch redirect entries dynamically from your CMS (e.g., Contentstack)
- Return static redirect rules defined in code
- Include cache headers (e.g., `s-maxage`) to control how long data is cached at the CDN/edge level

**Example API Response:**
```json
[
  {
    "source": "/test-old",
    "destination": "/test-new",
    "status": 301
  }
]
```

### 2. Edge Function (`functions/[proxy].edge.js`)

The edge function fetches redirect data from the API route and performs redirects at the edge.

**Important:** When fetching the API route, pass the original request to preserve headers and context:

```javascript
const response = await fetch(new Request(apiUrl, request));
```

This ensures the original request headers and context are preserved when processing redirects.


For more details on Launch Edge Functions, visit:
https://www.contentstack.com/docs/developers/launch/edge-functions


