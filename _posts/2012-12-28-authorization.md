---
title: 'Authorization'
layout: nil
---

All requests must be authorized, or they will fail with
[a 401 error](#/status-codes).

To authorize a request, simply add the `Authorization` header - replacing
`YourTokenHere` with a valid access token.

~~~
Authorization: Bearer YourTokenHere
~~~

### Access Tokens

Presently, access tokens must be provided as environment variables when setting
up the service.
