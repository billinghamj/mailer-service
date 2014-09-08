---
category: Message
title: 'Create a Message'

type: 'POST'
path: '/messages'

layout: nil
---

### Request

The minimum required object is:

~~~
{
	"from": "no-reply@example.com",
	"to": [
		"user@example.net"
	],
	"subject": "Very interesting email",
	"textBody": "Inspirational content",
	"htmlBody": "<p>Inspirational content</p>"
}
~~~

You must have at least one of `textBody` and `htmlBody`. Optionally, you may
supply both. It is recommended that you always have `textBody` however, for
compatibility with email clients.

This capability is available:

~~~
{
	"from": "no-reply@example.com",
	"replyto": "support@example.com",
	"to": [
		"user@example.net",
		"user2@example.org"
	],
	"cc": [
		"foo@example.org",
		"bar@example.net",
		"fubar@example.org"
	],
	"bcc": [
		"mirror@example.com"
	],
	"subject": "Very interesting email",
	"textBody": "Inspirational content",
	"htmlBody": "<p>Inspirational content</p>"
}
~~~

### Response

A `201 Created` status will be returned. Presently, no `Location` header will be
provided - nor any body content.
