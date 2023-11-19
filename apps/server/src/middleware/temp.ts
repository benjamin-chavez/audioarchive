// backend/src/middleware/temp.ts

// backend/src/middleware/customErrors.ts

import { Request, Response, NextFunction } from 'express';

export class CustomError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class BadRequestError extends CustomError {
  constructor(message = 'Bad Request') {
    super(message, 400);
  }
}

export class NotFoundError extends CustomError {
  constructor(message = 'Resource Not Found') {
    super(message, 404);
  }
}

// ... Add more custom error classes as needed ...

export default function errorHandler(
  err: CustomError | Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof CustomError) {
    res.status(err.statusCode).json({ message: err.message });
  } else {
    console.error((err as Error).stack);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
