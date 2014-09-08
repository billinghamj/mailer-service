# mailer-service

`mailer-service` exposes the [`resilient-mailer`](//github.com/billinghamj/resilient-mailer) library as a RESTful API.

[![Build Status](https://img.shields.io/travis/billinghamj/mailer-service.svg?style=flat)](//travis-ci.org/billinghamj/mailer-service)
[![Coverage Status](https://img.shields.io/coveralls/billinghamj/mailer-service.svg?style=flat)](//coveralls.io/r/billinghamj/mailer-service)

## Installation

```bash
$ npm install
```

### Configuration

Requires the following environment variables:

- `AUTHORIZATION_TOKEN` - a fixed string to protect unauthorized use
- `MAILGUN_APIKEY` - api key for a mailgun account
- `MAILGUN_DOMAIN` - domain belonging to the mailgun account
- `MAILJET_APIKEY` - api key for a mailjet account
- `MAILJET_APISECRET` - api secret for the mailjet account
- `MANDRILL_APIKEY` - api key for a mandrill account
- `SENDGRID_APIUSER` - api user for a sendgrid account
- `SENDGRID_APIKEY` - api key for the sendgrid account

Optionally, to disable debug output, etc.:

- `NODE_ENV` - set to `production`

## Running

```bash
$ npm start
```

## Usage

See [API documentation](//billinghamj.github.io/mailer-service/).

## Testing

Run the tests (after installation):

```bash
$ npm test
```

## Support

Please open an issue on this repository.

## Authors

- James Billingham <james@jamesbillingham.com>

## License

MIT licensed - see [LICENSE](LICENSE) file
