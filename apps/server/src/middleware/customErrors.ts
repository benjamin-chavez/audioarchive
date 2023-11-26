// backend/src/middleware/customErrors.ts

class CustomError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

class BadRequestError extends CustomError {
  constructor(message = 'Bad Request') {
    super(message, 400);
  }
}

class NotFoundError extends CustomError {
  constructor(message = 'Resource Not Found') {
    super(message, 404);
  }
}

class UnauthorizedError extends CustomError {
  constructor(message = 'Unauthorized') {
    super(message, 401);
  }
}

// ... Add more custom error classes as needed ...

// export { CustomError, BadRequestError, NotFoundError };
export { CustomError, BadRequestError, NotFoundError, UnauthorizedError };
