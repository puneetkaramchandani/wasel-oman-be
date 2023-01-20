const { sanitize } = require("express-mongo-sanitize");
const BaseJoi = require("joi");
const sanitizeHTML = require("sanitize-html");

const extension = (joi) => ({
  type: "string",
  base: joi.string(),
  messages: {
    "string.escapeHTML": "{{#label}} must not include HTML!",
  },
  rules: {
    escapeHTML: {
      validate(value, helpers) {
        const clean = sanitizeHTML(value, {
          allowedTags: [],
          allowedAttributes: {},
        });
        if (clean !== value)
          return helpers.error("string.escapeHTML", { value });
        return clean;
      },
    },
  },
});

const Joi = BaseJoi.extend(extension);

module.exports.userLoginSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "in"] } })
    .required()
    .escapeHTML(),
  password: Joi.string().required().escapeHTML(),
});

module.exports.userRegisterSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "in"] } })
    .required()
    .escapeHTML(),
  password: Joi.string().required().escapeHTML(),
  confirmPassword: Joi.ref("password"),
  type: Joi.string().valid("user", "vendor").escapeHTML(),
});
