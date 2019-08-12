const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env_SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "dinesh650@rediffmail.com",
    subject: "Thanks for joining in!",
    text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
  });
};

const sendCancellationEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "dinesh650@rediffmail.com",
    subject: "Sorry to see you go!",
    text: `Dear ${name}, Sorry to see you leave us. Please let us know if we could have done anything to kept you onboard.`
  });
};

module.exports = {
  sendWelcomeEmail,
  sendCancellationEmail
};
