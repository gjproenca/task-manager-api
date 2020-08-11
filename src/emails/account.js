const sgMail = require("@sendgrid/mail");
const sendgridAPIKey =
  "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";

sgMail.setApiKey(sendgridAPIKey);

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "gjsproenca@gmail.com",
    subject: "Welcome",
    text: `Welcome to the app, ${name}, let me know how you get along with the app.`,
  });
};

const sendDeleteEmail = (email) => {
  sgMail.send({
    to: email,
    from: "gjsproenca@gmail.com",
    subject: "Account deleted",
    text: `The account belonging to ${email} has been deleted.`,
  });
};

module.exports = {
  sendWelcomeEmail,
  sendDeleteEmail,
};
