const { ExpressError } = require("../../utils");
const dotenv = require("dotenv");
dotenv.config();
const mailjet = require("node-mailjet").apiConnect(
  process.env.MAILJET_API_KEY,
  process.env.MAILJET_API_SECRET
);

// Send welcome email to vendor partner
module.exports = async function sendEmailVerificationMail(
  email,
  name,
  base_url,
  confirm_email_link,
  action_type
) {
  try {
    const { response } = await mailjet
      .post("send", { version: "v3.1" })
      .request({
        Messages: [
          {
            From: {
              Email: "puneet.karamchandani@cognitioworld.com",
              Name: "Wasel",
            },
            To: [
              {
                Email: email,
                Name: name,
              },
            ],
            TemplateID: 4787201,
            TemplateLanguage: true,
            Subject: "Verify your email address to complete your account setup",
            Variables: {
              base_url: base_url,
              confirm_email_link: confirm_email_link,
              action_type: action_type,
            },
          },
        ],
      });
  } catch (err) {
    // console.log(err.statusCode);
    throw new ExpressError(err.toString(), 400);
  }
};
