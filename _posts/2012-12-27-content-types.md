---
title: 'Content Types'
layout: nil
---

At present, JSON is the only supported data type. This applies both to the body
of any requests you send to the API, and to the output from the API in response
to any requests.

The MIME type for JSON is `application/json`. No other type will be accepted.

If you attempt to POST non-JSON data to the API, you will receive
[a 415 error](#/status-codes).

If you specify an `Accept` header which doesn't allow for `application/json`,
you will receive [a 406 error](#/status-codes).
