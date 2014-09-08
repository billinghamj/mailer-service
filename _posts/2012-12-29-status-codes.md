---
title: 'Status Codes'
layout: nil
---

### Success

These status codes are the most common in responses:

* `GET`, `PUT`, `DELETE` returns `200 OK` - indicating success
* `POST` returns `201 Created` - indicating the creation of a new resource

Note that in some cases, a `201` response will not contain a `Location` header.

All methods can return `1xx` and `3xx` status codes, but these will provide
information leading to a final `2xx` response. (e.g. a `GET` could return
`302 Found`, with a `Location` header containing the URL to the resource)

### Failure

In the event of an error, all responses will be in accordance with
[RFC2616](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4) - the
standard HTTP status code definitions.

The body of the response may include additional useful information, but should
not be relied upon at this time. Use the HTTP status codes & headers only to
handle failures.
