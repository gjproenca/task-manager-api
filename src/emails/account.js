const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "gjsproenca@gmail.com",
    subject: "Welcome",
    text: `Welcome to the app, ${name}, let me know how you get along with the app.`,
  });
};

const sendCancelationEmail = (email) => {
  sgMail.send({
    to: email,
    from: "gjsproenca@gmail.com",
    subject: "Account deleted",
    text: `The account belonging to ${email} has been deleted.`,
  });
};

module.exports = {
  sendWelcomeEmail,
  sendCancelationEmail,
};
