// apps/server/src/middleware/errorMiddleware.ts

// export const notFoundHandler = (req, res, next) => {
//   const error = new Error(`Not Found = ${req.originalUrl}`);
//   res.status(404);
//   next(error);
// };

// export const generalErrorHandler = (err, req, res, next) => {
//   const statusCode = res.statusCode == 200 ? 500 : res.statusCode;

//   res.status(statusCode).json({
//     message: err.message,
//     stack: process.env.NODE_ENV === 'production' ? null : err.stack,
//   });
// };

import { CustomError } from './customErrors';
import { Request, Response, NextFunction } from 'express';

function errorHandler(
  error: CustomError | Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof CustomError) {
    res.status(error.statusCode).json({ message: error.message });
  } else {
    console.error((error as Error).stack);
    res.status(500).json({ message: `Internal Server Error` });
  }
}

export default errorHandler;
