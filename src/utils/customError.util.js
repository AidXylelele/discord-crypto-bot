class CustomError extends Error {
  constructor(message, name) {
    super(message);
    this.name = name;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = { CustomError };
