const STATUS_CODES = {
  SUCCESS: {
    code: 200,
    message: "Success!",
  },
  NO_CONTENT: {
    code: 204,
    message: "No Content",
  },
  BAD_REQUEST: {
    code: 400,
    message: "Bad Request",
  },
  UNAUTHORIZED: {
    code: 401,
    message: "Unauthorized Access",
  },
  FORBIDDEN: {
    code: 403,
    message: "Forbidden Resource",
  },
  NOT_FOUND: {
    code: 404,
    message: "Not Found",
  },
  CONFLICT: {
    code: 409,
    message: "Conflict data already exist",
  },
  INTERNAL_SERVER_ERROR: {
    code: 500,
    message: "Internal Server Error",
  },
  INVALID_INPUT: {
    code: 4000,
    message: "Please Provide valid Details",
  },
  USER_NOT_DEFINED: {
    code: 4011,
    message: "The email address is not registered",
  },
  PASSWORD_INCORRECT: {
    code: 4014,
    message: "Password is incorrect",
  },
  USER_ALREADY_EXISTS: {
    code: 4008,
    message: "Email already in use",
  },
};

module.exports = STATUS_CODES;
