/**
 * @author Jake Hewitt
 * Description:
 */

var config = require('./config');
var sendgrid = require('sendgrid')(config.api_key);
var email = new sendgrid.Email({
    to: 'jakehewitt526@gmail.com',
    from: 'jake@apollorobotics.org',
    subject: 'Subject goes here',
    text: 'Hello world'
});
sendgrid.send(email, function (err, json) {
    if (err) {
        return console.error(err);
    }
    console.log(json);
});
