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
  description: Joi.string().required(),
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
  type: Joi.string().required(),
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

module.exports.createNewProductSchema = Joi.object({
  name: Joi.string().required().escapeHTML(),
  description: Joi.string().max(250).required(),
  price: Joi.number().positive().required(),
  type: Joi.string().required().escapeHTML(),
  cuisine: Joi.string().required().escapeHTML(),
  category: Joi.string().required().escapeHTML(),
  images: Joi.array().min(1).required(),
});

module.exports.updateProductDetailsSchema = Joi.object({
  product_id: Joi.string().required().escapeHTML(),
  product_details: Joi.object({
    name: Joi.string().escapeHTML(),
    description: Joi.string().max(250),
    price: Joi.number().positive(),
    type: Joi.string().escapeHTML(),
    cuisine: Joi.string().escapeHTML(),
    category: Joi.string().escapeHTML(),
    images: Joi.array().min(1),
  })
    .min(1)
    .required(),
});

module.exports.createNewTableSchema = Joi.object({
  number: Joi.number().min(0).required(),
  price: Joi.number().min(0).required(),
  capacity: Joi.number().min(1).required(),
});

module.exports.updateTableSchema = Joi.object({
  tableId: Joi.string().required().escapeHTML(),
  data: Joi.object({
    number: Joi.number().min(0),
    price: Joi.number().min(0),
    capacity: Joi.number().min(1),
  })
    .min(1)
    .required(),
});

module.exports.newOrderSchema = Joi.object({
  cid: Joi.string().required().escapeHTML(),
  bookingDetails: Joi.object({
    firstName: Joi.string().required().escapeHTML(),
    lastName: Joi.string().required().escapeHTML(),
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
    request: Joi.string().escapeHTML(),
    date: Joi.date().required(),
    time: Joi.string().required(),
  }),
});
