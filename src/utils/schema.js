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
  phone: Joi.object({
    code: Joi.string().required().escapeHTML(),
    phone: Joi.string()
      .required()
      .regex(/^\d{10}$/),
  }).required(),
  password: Joi.string().required().escapeHTML(),
  confirmPassword: Joi.ref("password"),
  type: Joi.string().valid("user", "vendor").required().escapeHTML(),
});

module.exports.contactUsQuerySchema = Joi.object({
  name: Joi.string().required().escapeHTML(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "in"] } })
    .required()
    .escapeHTML(),
  phone: Joi.object({
    code: Joi.string().required().escapeHTML(),
    phone: Joi.string()
      .required()
      .regex(/^\d{10}$/),
  }).required(),
  message: Joi.string().required().escapeHTML(),
});

module.exports.createNewRestaurantSchema = Joi.object({
  name: Joi.string().required().escapeHTML(),
  address: Joi.object({
    line: Joi.string().required().escapeHTML(),
    line: Joi.string().required().escapeHTML(),
    areaPinCode: Joi.string().required().escapeHTML(),
    locality: Joi.string().required().escapeHTML(),
    location: Joi.object({
      long: Joi.string().required().escapeHTML(),
      lat: Joi.string().required().escapeHTML(),
    }).required(),
  }).required(),
  service: Joi.object({
    daysOff: Joi.array().required(),
    openTime: Joi.string().required().escapeHTML(),
    closeTime: Joi.string().required().escapeHTML(),
  }).required(),
  type: Joi.string().required().escapeHTML(),
  cuisines: Joi.array().required(),
  thumbnail: Joi.object({
    fileName: Joi.string().required().escapeHTML(),
    url: Joi.string().required(),
  }).required(),
  logo: Joi.object({
    fileName: Joi.string().required().escapeHTML(),
    url: Joi.string().required(),
  }).required(),
});
