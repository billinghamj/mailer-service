var ResilientMailer = require('resilient-mailer');
var MailgunProvider = require('resilient-mailer-mailgun');
var MailjetProvider = require('resilient-mailer-mailjet');
var MandrillProvider = require('resilient-mailer-mandrill');
var SendgridProvider = require('resilient-mailer-sendgrid');

module.exports = function () {
	var mailgun = new MailgunProvider(process.env.MAILGUN_DOMAIN, process.env.MAILGUN_APIKEY);
	var mailjet = new MailjetProvider(process.env.MAILJET_APIKEY, process.env.MAILJET_APISECRET);
	var mandrill = new MandrillProvider(process.env.MANDRILL_APIKEY);
	var sendgrid = new SendgridProvider(process.env.SENDGRID_APIUSER, process.env.SENDGRID_APIKEY);

	var mailer = new ResilientMailer();

	mailer.registerProvider(mailgun);
	mailer.registerProvider(mailjet);
	mailer.registerProvider(mandrill);
	mailer.registerProvider(sendgrid);

	return mailer;
}
