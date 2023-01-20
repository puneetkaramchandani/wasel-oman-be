const ExpressError = require("./expressError");

async function validateSchema(schema, data) {
  const { error } = schema.validate(data);
  if (error) {
    const message = error.details.map((el) => el.message).join(",");
    throw new ExpressError(message, 400);
  }
  return;
}

module.exports = validateSchema;
